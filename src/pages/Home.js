import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/data/dataActions';
import Header from '../components/Header';
import store from '../redux/store';
import EWTlogo from '../assets/images/EWTlogo.png';
import usdicon from '../assets/images/usdicon.png';
import { connect } from '../redux/blockchain/blockchainActions';

const Home = () => {
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
        if (blockchain.account !== "") {
            dispatch(fetchData());
        }
    }, [blockchain.account, dispatch]);

    async function startApp() {
        window.ethereum.sendAsync({
            method: "eth_accounts",
            params: [],
            jsonrpc: "2.0",
            id: new Date().getTime()
        }, function (error, result) {
            if (result["result"] !== "") dispatch(connect());
        });
    }

    window.addEventListener('load', function () {
        startApp();
    })

    console.log(data)

    const [stakingInfo1, setStakinginfo1] = useState(0)
    const [stakingInfo2, setStakinginfo2] = useState(0)
    const [stakingInfo3, setStakinginfo3] = useState(0)

    async function getStakingInfo() {
        try {
            let stakingInfo = await store
            .getState()
            .blockchain.ewtStakingContract.methods.stakes(blockchain.account)
            .call();
            setStakinginfo1(stakingInfo[0] / 1000000000000000000)
            setStakinginfo2(stakingInfo[1] / 1000000000000000000)
            setStakinginfo3(stakingInfo[3] / 1000000000000000000)
        } catch (error) {
            return;
        }
    }

    const [ewtprice, setEwtprice] = useState(0);
    async function getEwtprice() {
        let httpobj = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=energy-web-token&vs_currencies=usd')
        let ewtprice = await httpobj.json()
        setEwtprice(ewtprice["energy-web-token"]["usd"])
    }
    useEffect(() => {
        getEwtprice();
    }, [])

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [months, setMonths] = useState(0);

    setInterval(function() {
        // end unix time: 1671318000
        let currentUnixTimestamp = Math.floor(Date.now() / 1000)
        setSeconds(1702650600 - currentUnixTimestamp)
        setMinutes((1702650600 - currentUnixTimestamp) / 60)
        setHours((1702650600 - currentUnixTimestamp) / 60 / 60)
        setDays((1702650600 - currentUnixTimestamp) / 60 / 60 / 24)
        setWeeks((1702650600 - currentUnixTimestamp) / 60 / 60 / 24 / 7)
        setMonths((1702650600 - currentUnixTimestamp) / 60 / 60 / 24 / 7 / 4)
        //console.log(remainingSeconds, remainingMinutes, remainingHours, remainingDays, remainingWeeks)

        getStakingInfo();
    }, 1000);

    return (
        <div className="w-full min-h-[100vh] flex justify-center align-start flex-col flex-nowrap bg-bgprimary dark:bg-darkbgprimary transition-all">
            <div className="w-full min-h-[100vh] bg-backgroundimagepage bg-no-repeat bg-cover">
                <div className='h-auto my-[7.5vh] lg:my-[10vh] xl:my-[12.5vh] bg-bgsecondary dark:bg-darkbgsecondary w-[95%] md:w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 mx-auto rounded-3xl
                    shadow-[0_0px_10px_2px_rgba(15,23,35,0.30)] dark:shadow-[0_0px_10px_2px_rgba(245,245,230,0.2)]'>
                    <div className="w-full h-full py-2 flex flex-col mx-auto">
                        <div className='text-textprimary dark:text-darktextprimary transition-all px-4 py-2'>
                            <Header />
                            {blockchain.account === "" || blockchain.smartContract === null ? (
                                <div className='p-2 sm:p-4 md:px-6 lg:px-8 xl:px-12 text-darktextprimary'>
                                    <div className='bg-[#ececec] dark:bg-[#161A21] mb-4 p-4 rounded-md'>
                                        <div>
                                            <div>
                                                <p>
                                                    You are not logged in yet
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='p-2 sm:p-4 md:px-6 lg:px-8 xl:px-12 text-darktextprimary'>
                                    <div className='bg-[#ececec] dark:bg-[#161A21] mb-4 p-4 rounded-md'>
                                        <div>
                                            <div>
                                                <p className='text-green-600 dark:text-green-200 break-all'>
                                                    Welcome <span className='p-1 rounded-md bg-[#dbdbdb] dark:bg-[rgba(14,14,27,0.6)]'>{blockchain.account}</span>, You are now logged in!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {data["totalSupply"] > 0 ? (
                                        <>
                                            <div className='bg-[#ececec] dark:bg-[#161A21] mt-4 p-4 rounded-md'>
                                                <div className='flex flex-col'>
                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <h1 className='font-bold flex flex-row text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>Current staking balance (compounded): {(parseFloat(stakingInfo2)).toFixed(4)} <img className='ml-[6px] h-[26px] flex my-auto' src={EWTlogo} alt="" /></h1>
                                                            <div className='mt-3 flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                                                <p>Deposited EWT: {(parseFloat(stakingInfo1)).toFixed(4)}</p>
                                                                <p>Earned: {(parseFloat(stakingInfo2 - stakingInfo1)).toFixed(2)} EWT</p>

                                                                <p className='mt-3'>Total staking rewards based on current deposited EWT amount: {(parseFloat(stakingInfo3)).toFixed(2)}</p>
                                                                <p>Estimated EWT rewards left to earn: {(parseFloat(stakingInfo3 - (stakingInfo2 - stakingInfo1))).toFixed(2)}</p>

                                                                <p className='mt-3'>Projected balance after staking period: {((parseFloat(stakingInfo2))+(parseFloat(stakingInfo3 - (stakingInfo2 - stakingInfo1)))).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-[#ececec] dark:bg-[#161A21] mt-4 p-4 rounded-md'>
                                                <div>
                                                    <h1 className='font-bold flex flex-row text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>Estimated EWT rewards left: {(parseFloat(stakingInfo3 - (stakingInfo2 - stakingInfo1))).toFixed(2)} <img className='ml-[6px] h-[26px] flex my-auto' src={EWTlogo} alt="" /></h1>
                                                    <h1 className='font-bold flex flex-row text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>${(parseFloat(stakingInfo3 - (stakingInfo2 - stakingInfo1))*ewtprice).toFixed(2)} <img className='ml-[6px] h-[26px] flex my-auto' src={usdicon} alt="" /></h1>
                                                    <table className="mt-3 table-auto text-textprimary dark:text-darktextprimary transition-all">
                                                        <thead>
                                                            <tr>
                                                                <th className='pr-[8px]'>Timeframe</th>
                                                                <th className='px-[8px]'>Amount EWT <img className='inline ml-[3px] mb-[2px] h-[16px] my-auto' src={EWTlogo} alt="" /></th>
                                                                <th className='px-[8px]'>Amount USD <img className='inline ml-[3px] mb-[2px] h-[16px] my-auto' src={usdicon} alt="" /></th>
                                                                <th className='px-[8px]'>Remaining time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Second: </td>
                                                                <td className='px-[8px]'>{((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / seconds).toFixed(5)}</td>
                                                                <td className='px-[8px]'>${(((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / seconds)*ewtprice).toFixed(5)}</td>
                                                                <td className='px-[8px]'>{seconds} Seconds</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Minute: </td>
                                                                <td className='px-[8px]'>{((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / minutes).toFixed(5)}</td>
                                                                <td className='px-[8px]'>${(((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / minutes)*ewtprice).toFixed(5)}</td>
                                                                <td className='px-[8px]'>{minutes.toFixed(0)} Minutes</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Hour: </td>
                                                                <td className='px-[8px]'>{((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / hours).toFixed(5)}</td>
                                                                <td className='px-[8px]'>${(((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / hours)*ewtprice).toFixed(5)}</td>
                                                                <td className='px-[8px]'>{hours.toFixed(0)} Hours</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Day: </td>
                                                                <td className='px-[8px]'>{((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / days).toFixed(5)}</td>
                                                                <td className='px-[8px]'>${(((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / days)*ewtprice).toFixed(5)}</td>
                                                                <td className='px-[8px]'>{days.toFixed(2)} Days</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Week: </td>
                                                                <td className='px-[8px]'>{((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / weeks).toFixed(5)}</td>
                                                                <td className='px-[8px]'>${(((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / weeks)*ewtprice).toFixed(5)}</td>
                                                                <td className='px-[8px]'>{weeks.toFixed(2)} Weeks</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Month: </td>
                                                                <td className='px-[8px]'>{((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / months).toFixed(5)}</td>
                                                                <td className='px-[8px]'>${(((stakingInfo3 - (stakingInfo2 - stakingInfo1)) / months)*ewtprice).toFixed(5)}</td>
                                                                <td className='px-[8px]'>{months.toFixed(2)} Months</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='bg-[#ececec] dark:bg-[#161A21] mt-4 p-4 rounded-md'>
                                                <div className='flex flex-col'>
                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <h1 className='font-bold flex flex-row text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>Staking pool balance: 0 <img className='ml-[6px] h-[26px] flex my-auto' src={EWTlogo} alt="" /></h1>
                                                            <div className='mt-3 flex flex-col text-textprimary dark:text-darktextprimary transition-all'>
                                                                <p>Deposited EWT: 0</p>
                                                                <p>Earned: 0 EWT</p>
                                                                <p>Current staking balance (compounded): 0</p>
                                                                <p className='mt-3'>Total staking rewards based on current deposited EWT amount: 0</p>
                                                                <p>Estimated EWT rewards left to earn: 0</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-[#ececec] dark:bg-[#161A21] mt-4 p-4 rounded-md'>
                                                <div>
                                                    <h1 className='font-bold flex flex-row text-lg sm:text-xl text-textprimary dark:text-darktextprimary transition-all'>Estimated EWT rewards left: 0 <img className='ml-[6px] h-[26px] flex my-auto' src={EWTlogo} alt="" /></h1>
                                                    <table className="mt-3 table-auto text-textprimary dark:text-darktextprimary transition-all">
                                                        <thead>
                                                            <tr>
                                                                <th className='pr-[8px]'>Timeframe</th>
                                                                <th className='px-[8px]'>Amount</th>
                                                                <th className='px-[8px]'>Remaining time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Second: </td>
                                                                <td className='px-[8px]'>0</td>
                                                                <td className='px-[8px]'>{seconds} Seconds</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Minute: </td>
                                                                <td className='px-[8px]'>0</td>
                                                                <td className='px-[8px]'>{minutes.toFixed(0)} Minutes</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Hour: </td>
                                                                <td className='px-[8px]'>0</td>
                                                                <td className='px-[8px]'>{hours.toFixed(0)} Hours</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Day: </td>
                                                                <td className='px-[8px]'>0</td>
                                                                <td className='px-[8px]'>{days.toFixed(2)} Days</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Week: </td>
                                                                <td className='px-[8px]'>0</td>
                                                                <td className='px-[8px]'>{weeks.toFixed(2)} Weeks</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='pr-[8px]'>EWT/Month: </td>
                                                                <td className='px-[8px]'>0</td>
                                                                <td className='px-[8px]'>{months.toFixed(2)} Months</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;