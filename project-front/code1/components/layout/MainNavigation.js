import Link from 'next/link';
import classes from './MainNavigation.module.css';
import { useRouter } from "next/router";

function MainNavigation() {

  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>知音</div>
      <nav>
        <ul className="font-bold content-center">
          <li>
            <Link href='/'>
              <a style={{textDecoration: 'none'}} >首頁</a>
            </Link>
          </li>
          {/* <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li> */}
          <li>
            <Link href='#'
            >
              <a style={{textDecoration: 'none'}}
                onClick={e => {
                  e.preventDefault()

                  if(sessionStorage.getItem("token") == null){
                    alert('尚未登入，不能進入到個人天地')
                  }else{
                    router.push("/personal_space");
                  }                  
                }}>
                個人天地
              </a>
            </Link>
          </li>
          <li>
            {/* <Link href="/" onClick={logout}>登出</Link> */}
            <Link href='#'>
              <a style={{textDecoration: 'none'}}
                onClick={e => {
                  e.preventDefault()
                  if(sessionStorage.getItem("token") == null){
                    alert('尚未登入，不能登出')
                  }else{
                    console.log('Logout');

                    // CLEAR DATA FROM STORAGE
                    sessionStorage.clear();
                    // sessionStorage.removeItem('token');

                    alert("登出成功");
                    router.push("/");
                  }
                }}>
                登出
              </a>
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
