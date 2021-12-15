import React, { useEffect } from 'react'
import styled from "styled-components"
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectUserName,
        selectUserPhoto,
        setUserLoginDetails,
        setSignOutState } from '../features/user/userSlice';
import { auth, provider } from './firebase'

function Header(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=> {
            if(user) {
                setUser(user)
                history.push("/home")
            }
        })
    },[userName,history])

    const handleAuth = () => {

        if(!userName) {
            auth.signInWithPopup(provider)
            .then((result) => {
                setUser(result.user)
                console.log(result)
            }).catch((error)=> {
                alert(error.message)
            })
        } else if (userName) {
            auth.signOut().then(()=> {
                dispatch(setSignOutState())
                history.push("/")
            }).catch(
                (err) =>( alert(err.message))
                )
        }

        
    }

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })
        )
    }

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney-Logo" />
            </Logo>

            {
                !userName ? 
                <Login onClick={handleAuth}>Login</Login>
                : 
                    <>
                        <NavMenu>
                            <a href="/home">
                                <img src="/images/home-icon.svg" alt="Home" />
                                <span>HOME</span>
                            </a>
                            <a>
                                <img src="/images/search-icon.svg" alt="Search" />
                                <span>SEARCH</span>
                            </a>
                            <a>
                                <img src="/images/watchlist-icon.svg" alt="Watch" />
                                <span>WATCHLIST</span>
                            </a>
                            <a>
                                <img src="/images/original-icon.svg" alt="Original" />
                                <span>ORIGINALS</span>
                            </a>
                            <a>
                                <img src="/images/movie-icon.svg" alt="Movies" />
                                <span>MOVIES</span>
                            </a>
                            <a>
                                <img src="/images/series-icon.svg" alt="Series" />
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <SignOut>
                        <UserImg src={userPhoto} alt={userName}/>
                        <DropDown>
                            <span onClick={handleAuth}>Sign out</span>
                        </DropDown>
                        </SignOut>
                    </>
            }

        </Nav>
    )
}


const Nav = styled.nav`
    position:fixed;
    top:0;
    left:0;
    right:0;
    height:70px;
    background-color: #090b13;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:0 36px;
    letter-spacing: 16px;
    z-index:3;    
`

const Logo = styled.a`
    padding:0;
    width: 80px;
    margin-top:4px;
    max-height:70px;
    display:inline-block;

    img {
        width:100%;
        display:block;
    }
`

const NavMenu = styled.div`
    display:flex;
    align-items:center;
    flex-flow:row nowrap;
    height:100%;
    justify-content: flex-end;
    margin: 0 auto 0 25px;
    padding:0px;
    position:relative;

    a {
        display:flex;
        align-items:center;
        padding:0 12px;
        cursor:pointer;

        img {
                height: 20px;
                min-width:20px;
                width:20px;
                z-index: auto;
            }
        span {
                color:rgba(249,249,249);
                font-size: 13px;
                letter-spacing: 1.4px;
                line-height: 1.10;
                padding: 3px 0;
                white-space: nowrap;
                position:relative;


                &:before {
                    background-color:rgba(249,249,249);
                    border-radius: 4px;
                    bottom: -6px;
                    left:0;
                    right: 0;
                    content: "";
                    height:2px;
                    width:auto;
                    opacity:0;
                    position:absolute;
                    transform: scalex(0);
                    transform-origin: left center;
                    transition: all 0.25s ease-in;
                }

            }

    

        &:hover {
                    span:before {
                        transform: scaleX(1);
                        opacity: 1 ;
                    }
                }
    }



    @media (max-width: 768px) {
        display:none;
    }

`

const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    cursor:pointer;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f9f9f9;
        color:#000;
    }
`

const UserImg = styled.img`
    height: 100%;
`
const DropDown = styled.div`
    position:absolute;
    top:48px;
    right:0px;
    background: rgba(19,19,19);
    border: 1px solid rgba(151,151,151,0.4);\
    border-radius: 4px;
    box-shadow: rgb(299, 0, 0,50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width:100px;
    opacity:0;

`
const SignOut = styled.div`
    position:relative;
    height:48px;
    width: 48px;
    display: flex;
    cursor:pointer;
    align-items:center;
    justify-content: center;

    ${UserImg} {
        border-radius:50%;
        width:100%;
        height:100%;
    }

    &:hover {
        ${DropDown} {
            opacity:1;
            transition-duration: 1s;
        }
    }
`
export default Header
