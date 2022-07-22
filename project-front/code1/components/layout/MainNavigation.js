import Link from 'next/link';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul class="font-bold">
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
          <li>
            <Link href='/personal_space'>個人天地</Link>
          </li>
          <li>
            <Link href='/sign'>登入註冊</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
