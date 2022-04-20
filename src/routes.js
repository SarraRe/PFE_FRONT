import React from 'react';
import { Navigate  } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import AjoutClient from 'src/views/auth/AjoutClient';
import AjoutAchat from 'src/views/auth/AjoutAchat';
import UpdateAchat from 'src/views/auth/UpdateAchat';
import RevendeurListView from 'src/views/revendeur/RevendeurListView';
import Reclamations from 'src/views/Reclamations';
import AjoutRevendeur from 'src/views/rev/AjoutRevendeur';
import SupprimerRevendeur from 'src/views/rev/SupprimerRevendeur';
import AccepterRevendeur from 'src/views/rev/AccepterRevendeur';
import UpdateReclamation from 'src/views/rec/UpdateReclamation';
import SupprimerReclamation from 'src/views/rec/SupprimerReclamation';
import Personnels from 'src/views/Personnels';
import AjouterPersonnel from 'src/views/pers/AjouterPersonnel';
import UpdatePersonnel from 'src/views/pers/UpdatePersonnel';
import Produit from 'src/views/Produit';
import AjouterProduit from 'src/views/prod/AjouterProduit';
import UpdateProduit from 'src/views/prod/UpdateProduit';
import Navbar from 'src/layouts/Firstpart';
import FormRevendeur from 'src/views/frontapplication/Form.Revendeur';
import NotFoundView from 'src/views/frontapplication/NotFoundView';
import Main from 'src/views/frontapplication/Main'
import Interface1 from 'src/views/frontapplication/Interface1'
import Services from 'src/views/frontapplication/Services'
import Interface2 from 'src/views/frontapplication/Interface2'
import Auth1 from 'src/views/frontapplication/auth1'
import MJP1 from 'src/views/frontapplication/Form.MJP1'
import MdpClient from 'src/views/frontapplication/MdpClient'
import VoirRecClient from 'src/views/frontapplication/VoirRecClient'
import Reclamation from 'src/views/frontapplication/Form.Réclamations'
import MdpRevendeur from 'src/views/frontapplication/MdpRevendeur'
import VoirRecRevendeur from 'src/views/frontapplication/VoirRecRevendeur'
import Reclamationv from 'src/views/frontapplication/Form.Réclamationsv'
import MJP2 from 'src/views/frontapplication/Form.MJP2'
const routes = [
  {
    path: '/',
    element: <Navbar />,
    children: [
        {path :"/" ,  element :<Main/> },
       { path: 'revendeur', element: <FormRevendeur /> },
       {path: 'reclamation', element: <Reclamation /> },
        {path:'reclamtionv' , element:<Reclamationv/>},
        {path: "Interface1" , element:<Interface1/> },
        {path: "services" , element:<Services />},
        {path: "Interface2" , element:<Interface2 />},
        {path: "auth1" , element:<Auth1 />},
        {path: "MJP1" , element:<MJP1 />},
        {path: "MdpClient" , element:<MdpClient />},

        {path: "VoirRecClient" , element:<VoirRecClient />},
        {path: "MdpRevendeur" , element:<MdpRevendeur />},
        {path: "VoirRecRevendeur" , element:<VoirRecRevendeur />},
       
        {path: "MJP2" , element:<MJP2 />},
     {path: "*" , element:<NotFoundView />},
    ] },
    {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <CustomerListView /> },
      { path: 'candidat_revendeur', element: <RevendeurListView /> },
      { path: 'Reclamations', element: <Reclamations /> },
      { path: 'Personnels', element: <Personnels /> },
      { path: 'Produit', element: <Produit /> },
      { path: 'dashboard', element: <DashboardView /> },
       { path: '*', element: <Navigate  to="/404" /> },
    ]
  },
  {
    path: 'action',
    element: <MainLayout />,
    children: [
      { path: 'AjoutAchat', element: <AjoutAchat /> },
      { path: 'UpdateAchat', element: <UpdateAchat /> },
      { path: 'AjoutClient', element: <AjoutClient /> },
      { path: 'AjoutRevendeur', element: <AjoutRevendeur /> },
      { path: 'SupprimerRevendeur', element: <SupprimerRevendeur /> },
      { path: 'UpdateRevendeur/:id', element: <AccepterRevendeur /> },
      { path: 'UpdateReclamation/:id', element: <UpdateReclamation /> },
      { path: 'AjouterPersonnel', element: <AjouterPersonnel /> },
      { path: 'UpdatePersonnel/:id', element: <UpdatePersonnel /> },
      { path: 'UpdateAchat/:clients_Code', element: <UpdateAchat /> },
      { path: 'SupprimerReclamation', element: <SupprimerReclamation /> },
      { path: 'AjouterProduit', element: <AjouterProduit /> },
      { path: 'UpdateProduit/:id', element: <UpdateProduit /> },
      { path: '/', element: <Navigate  to="/app/dashboard" /> },
       { path: '*', element: <Navigate  to="/404" /> },
    ]
  }
];

export default routes;
