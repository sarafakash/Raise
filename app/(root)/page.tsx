import HeaderBox from "@/components/HeaderBox"
import RightSideBar from "@/components/RightSideBar"
import TotalBalanceBox from "@/components/TotalBalanceBox"

const page = () => {

    const loggedIn = {firstName : "Akash", lastName : "Saraf", email: "akashsrf.123@gmail.com"}

    return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
                <HeaderBox 
                    type = "greeting"
                    title = "Welcome"
                    user = {loggedIn?.firstName}
                    subtext = "Access and manage your account and transactions efficiently"
                />

                <TotalBalanceBox
                    accounts = {[]}
                    totalBanks = {1}
                    totalCurrentBalance = {1250.35}
                />
            </header>
            RECENT TRANSACTIONS
        </div>
        <RightSideBar
            user={loggedIn}
            transactions={[]}
            banks={[{currentBalance: 123.50},{currentBalance: 500.50}]}
        />
    </section>
    )
}

export default page