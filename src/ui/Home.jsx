import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'
function Home() {
    const userName = useSelector((state) => state.user.userName)
    console.log(userName)
    return (
        <div className="my-10 text-center sm:my-16 p-4">
            <h1 className="text-xl font-semibold text-center mb-8 md:text-3xl">
                The best pizza.
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>
            {!userName ? (
                <CreateUser />
            ) : (
                <Button to="/menu" type={'primary'}>
                    Continue with your Order {userName}{' '}
                </Button>
            )}
        </div>
    )
}

export default Home
