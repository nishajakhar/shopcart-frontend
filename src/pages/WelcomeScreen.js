import useAuth from '../hooks/useAuth'
import Sidebar from '../components/Sidebar'

const Welcome = () => {
    const { name } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
    }).format(date)

    const content = (
        <div className="flex">
            <Sidebar />
            <section className="welcome p-10">
                <h1 className="text-3xl py-5">Welcome {name}!</h1>

                <p className="text-sm text-indigo-400">{today}</p>
            </section>
        </div>
    )

    return content
}
export default Welcome
