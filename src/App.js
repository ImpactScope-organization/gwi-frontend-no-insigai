import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Shared/Header'
import Settings from './Pages/Settings'
import Login from './Components/Shared/Login'
import 'react-quill-new/dist/quill.snow.css'
import { ROUTES } from './routes'
import AllReports from './Pages/Reports/AllReports'
import { NotFound } from './Pages/NotFound'

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/*<Route path={ROUTES.home} element={<Reports />} />*/}
        <Route path={ROUTES.reports.internal} element={<AllReports />} />
        <Route path={ROUTES.settings} element={<Settings />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.notFound} element={<NotFound />} />

        {/*<Route path="/settings" element={<Settings />}></Route>*/}
        {/*<Route path={ROUTES.reports} element={<AllReports />} />*/}
        {/*<Route path={ROUTES.create} element={<Create />} />*/}
        {/*<Route path={ROUTES.specificReport.index} element={<SpecificReport />} />*/}
        {/*<Route path={ROUTES.specificReport.edit} element={<EditSpecificReport />} />*/}
      </Routes>
    </div>
  )
}

export default App
