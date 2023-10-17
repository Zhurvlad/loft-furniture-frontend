import React from 'react';
import styles from '../../../styles/footer/index.module.scss'
import Link from 'next/link';
import {LogoSmallSvg} from '../../elements/LogoSmall/index';
import {MarkerSvg} from '../../elements/MarkerSvg/index';
import {PhoneSvg} from '../../elements/PhoneSvg/index';
import {MailSvg} from '../../elements/MailSvg/index';


const AvailableCategories = [
  {category: 'Кухни', link: '/kitchen'},
  {category: 'Кровати', link: '/kitchen'},
  {category: 'Диваны', link: '/kitchen'},
  {category: 'Шкафы', link: '/kitchen'},
  {category: 'Офисная мебель', link: '/kitchen'},
  {category: 'Детские', link: '/kitchen'},
  {category: 'Акции', link: '/kitchen'},
]

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__left}>
            <h4 className={styles.footer__top__title}>Навигация</h4>
            <ul className={styles.footer__left__list}>
              {AvailableCategories.map(item => (
                <li className={styles.footer__left__item} key={item.category}>
                  <Link href={item.link} legacyBehavior passHref>
                    <a>{item.category}</a>
                  </Link>
                </li>
              ))}

            </ul>
          </div>
          <div className={styles.footer__right}>
            <LogoSmallSvg/>
            <div className={styles.footer__top__inner}>
              <h3 className={styles.footer__top__title}>Контакты</h3>
              <ul className={styles.footer__top__contacts}>
                <li className={styles.footer__top__contacts__item}>
                  <Link href={'/contacts'} passHref legacyBehavior>
                    <a className={styles.footer__top__contacts__link} href="">
                      <span>Наш адрес:</span>
                      <span><MarkerSvg/></span>
                      <span>г. Анапа, Анапское шоссе,</span>
                      <span>30 Ж/К Черное море</span>
                    </a>
                  </Link>
                </li>
                <li className={styles.footer__top__contacts__item}>
                  <a href={'tel:+896489991199'} className={styles.footer__top__contacts__link} href="#">
                    <span>Наш контактный телефон:</span>
                    <span><PhoneSvg/></span>
                    <span>+7(8095) 555-55-55 </span>

                  </a>
                </li>
                <li className={styles.footer__top__contacts__item}>
                  <a href={'mailto:mebel_loft_anapa@mail.ru'} className={styles.footer__top__contacts__link}
                     href="">
                    <span>E-mail:</span>
                    <span><MailSvg/></span>
                    <span>mebel_loft_anapa@mail.ru</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__left}>
              <h3 className={styles.footer__bottom__title}>Мы принимаем к оплате:</h3>
              <ul className={styles.footer__bottom__pay}>
                <li className={styles.footer__bottom__pay__item}>
                  <img src="/img/pay.png" alt="apple-pay"/>
                </li>
                <li className={styles.footer__bottom__pay__item}>
                  <img src="/img/gpay.png" alt="google-pay"/>
                </li>
                <li className={styles.footer__bottom__pay__item}>
                  <img src="/img/masterCard.png" alt="master-card"/>
                </li>
                <li className={styles.footer__bottom__pay__item}>
                  <img src="/img/visa.png" alt="visa"/>
                </li>
              </ul>
            </div>
            <div className={styles.footer__bottom__right}>
              <h3 className={styles.footer__bottom__title}>Мы в соцсети:</h3>
              <ul className={styles.footer__bottom__social}>
                <li className={styles.footer__bottom__social__item}>
                  <a href="#" className={styles.footer__bottom__vk}/>
                </li>
                <li className={styles.footer__bottom__social__item}>
                  <a href="#" className={styles.footer__bottom__fb}/>
                </li>
                <li className={styles.footer__bottom__social__item}>
                  <a href="#" className={styles.footer__bottom__inst}/>
                </li>
                <li className={styles.footer__bottom__social__item}>
                  <a href="#" className={styles.footer__bottom__ytb}/>
                </li>
              </ul>
            </div>
          </div>
          {/*{isMedia750 && <FooterLogo/>}*/}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>Copyright Loft Мебель</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

