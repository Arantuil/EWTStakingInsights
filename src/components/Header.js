import { Link } from 'react-router-dom';
import tttlogo from '../assets/images/tttlogo.png';
import ewcnftlogo from '../assets/images/ewcnftlogo.png';
import ewplace from '../assets/images/ewplace.png';
import walleticon from '../assets/images/walleticon.png';
import { connect } from '../redux/blockchain/blockchainActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/data/dataActions';
import { useEffect } from 'react';
import Toggle from './Toggle';

const Header = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    useEffect(() => {
        getData();
    }, [blockchain.account]);

    return (
        <header className='z-5 w-full h-[70px] bg-bgprimary dark:bg-darkbgprimary transition-all flex items-center justify-between' >
            <div className='rounded-lg shadow-[0_0px_10px_3px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_3px_rgba(245,245,230,0.2)] w-full h-full
            bg-gradient-to-r from-[#9AEFA2] via-[#8DD7E4] to-[#C8A1FB] 
            dark:bg-gradient-to-r dark:from-[#368B3E] dark:via-[#297380] dark:to-[#643D97]
            transition-all flex flex-row'>
                <a href='https://energywebnfts.com/' className='flex flex-row ml-4 sm:ml-6 md:ml-10'>
                    <img className='rounded-lg 2xs:w-[28px!important] 2xs:h-[28px!important] mr-1 h-12 my-auto filter brightness-[90%] dark:brightness-[110%]' src={ewcnftlogo} alt="EnergyWebNFTs Logo" />
                    <h1 className='hidden md:block my-auto font-bold text-2xl ml-1 mr-2 text-textprimary dark:text-darktextprimary transition-all'>
                        EnergyWebNFTs
                    </h1>
                </a>
                <div className='h-full ml-auto mr-0 flex flex-row-reverse items-center'>
                    <Toggle/>
                </div>
                <div className='ml-2 my-auto'>
                {blockchain.account === "" ||
                    blockchain.smartContract === null ? (
                    <div className='flex flex-col justify-center'>
                        <div className='h-[40px]'>
                            <button className='hover:brightness-125 text-xl flex flex-row rounded-lg px-[6px] items-center py-[2px] my-auto mr-3 bg-[rgba(40,255,40,0.45)] text-textprimary dark:text-darktextprimary transition-all' onClick={(e) => {
                                e.preventDefault();
                                dispatch(connect());
                                getData();
                            }}>

                                <svg width="35px" height="35px" className="metamaskicon" strokeLinejoin="round" viewBox="0 0 318.6 318.6" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m274.1 35.5-99.5 73.9 18.4-43.6z" fill="#e2761b" stroke="#e2761b"></path><g fill="#e4761b" stroke="#e4761b"><path d="m44.4 35.5 98.7 74.6-17.5-44.3zm193.9 171.3-26.5 40.6 56.7 15.6 16.3-55.3z"></path><path d="m33.9 207.7 16.2 55.3 56.7-15.6-26.5-40.6zm69.7-69.5-15.8 23.9 56.3 2.5-2-60.5z"></path><path d="m214.9 138.2-39-34.8-1.3 61.2 56.2-2.5zm-108.1 109.2 33.8-16.5-29.2-22.8zm71.1-16.5 33.9 16.5-4.7-39.3z"></path></g><path d="M211.8 247.4l-33.9-16.5 2.7 22.1-.3 9.3zm-105 0l31.5 14.9-.2-9.3 2.5-22.1z" fill="#d7c1b3" stroke="#d7c1b3"></path><path d="m138.8 193.5-28.2-8.3 19.9-9.1zm40.9 0 8.3-17.4 20 9.1z" fill="#233447" stroke="#233447"></path><path d="M106.8 247.4l4.8-40.6-31.3.9zM207 206.8l4.8 40.6 26.5-39.7zm23.8-44.7l-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.2 23.1l20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z" fill="#cd6116" stroke="#cd6116"></path><path d="m87.8 162.1 23.6 46-0.8-22.9zm120.3 23.1-1 22.9 23.7-46zm-64-20.6-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0-2.7 18 1.2 45 6.7-34.1z" fill="#e4751f" stroke="#e4751f"></path><path d="m179.8 193.5-6.7 34.1 4.8 3.3 29.2-22.8 1-22.9zm-69.2-8.3 0.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z" fill="#f6851b" stroke="#f6851b"></path><path d="M180.3 262.3l.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z" fill="#c0ad9e" stroke="#c0ad9e"></path><path d="m177.9 230.9-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z" fill="#161616" stroke="#161616"></path><path d="M278.3 114.2l8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z" fill="#763d16" stroke="#763d16"></path><path d="M267.2 153.5l-52.3-15.3 15.9 23.9-23.7 46 31.2-.4h46.5zm-163.6-15.3l-52.3 15.3-17.4 54.2h46.4l31.1.4-23.6-46zm71 26.4l3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z" fill="#f6851b" stroke="#f6851b"></path>
                                </svg>
                                Connect
                            </button>
                        </div>

                        {blockchain.errorMsg !== "" ? (
                            <>
                                <h2 className='text-[0.77rem] text-center errormsg'>{blockchain.errorMsg}</h2>
                            </>
                        ) : null}
                    </div>
                ) : (
                    <button className='text-xl flex flex-row rounded-lg px-[6px] items-center py-[2px] my-auto mr-3 bg-[rgba(40,255,40,0.45)] text-textprimary dark:text-darktextprimary transition-all'>
                        Connected
                    </button>
                )}
            </div>
            <div className='-translate-y-[2px] right-0 flex my-auto mr-4 sm:mr-6 md:mr-10'>
                <img className='w-10 h-10 brightness-[80%] dark:brightness-[125%]' src={walleticon} alt="" />
            </div>
            </div>
        </header>
    );
}

export default Header;