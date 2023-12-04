import Link from 'next/link'

export const Custom404 = ({darkModeClass}: {darkModeClass: string}) => (


  <div className={`flex-container ${darkModeClass ? 'dark' : ''}`}>
    <div className="text-center">
      <h1>
        <span className="fade-in" id="digit1">
          4
        </span>
        <span className="fade-in" id="digit2">
          0
        </span>
        <span className="fade-in" id="digit3">
          4
        </span>
      </h1>
      <h3 className="fadeIn">PAGE NOT FOUND</h3>
      <Link href="/" passHref legacyBehavior>
        <button className={`${darkModeClass ? 'dark' : ''}`} type="button" name="button">
          Return To Home
        </button>
      </Link>
    </div>
  </div>
)
