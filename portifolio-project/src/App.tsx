import './App.css'
import Inico from './pages/Inicio'
import SobreMim from './pages/SobreMim'
import Navbar from './components/Navbar'
import Contato from './pages/Contato'
import Projetos from './pages/Projetos'


function App() {

    return (
        <>
            <Navbar />
            <Inico />
            <SobreMim />
            <Projetos />
            <Contato />
        </>
    )
}

export default App
