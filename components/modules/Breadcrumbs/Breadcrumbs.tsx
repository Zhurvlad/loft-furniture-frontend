
import React from 'react';
import Link from 'next/link';
import {ParsedUrlQuery} from "querystring";
import {useRouter} from 'next/router';

import {useAppSelector} from '../../../hooks/redux';

import {Crumb} from './Crumb';

import styles from '../../../styles/breadcrumbs/index.module.scss'

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/")
    .filter(v => v.length > 0);
}


export const Breadcrumbs = ({getTextGenerator, getDefaultTextGenerator}
                              : {
  getTextGenerator: (i: string, query: ParsedUrlQuery) => void,
  getDefaultTextGenerator: ((i: string, href: string) => string)
}) => {
  const router = useRouter();

  const {theme} = useAppSelector((state) => state.theme)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
    const asPathNestedRoutes = generatePathParts(router.asPath);
    const pathnameNestedRoutes = generatePathParts(router.pathname);

    const crumbList = asPathNestedRoutes.map((subpath, idx) => {
      const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");

      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      return {
        href, textGenerator: getTextGenerator(param, router.query),
        text: getDefaultTextGenerator(subpath, href)
      };
    })

    return [...crumbList];
  }, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]);

  return (
    <div className={'container'}>
      <ul className={styles.breadcrumbs}>
        <li className={styles.breadcrumbs__item}>
          <Link href={'/'} legacyBehavior passHref>
            <a>
              <span
                className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
                style={{marginRight: 0}}>
                Главная
              </span>
            </a>
          </Link>
        </li>

        {breadcrumbs.map((crumb, idx) => (
          <li className={`${styles.breadcrumbs__item} ${darkModeClass}`} key={idx}>
            {crumb.text
              //@ts-ignore
              ? <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1}/>
              : ''
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
