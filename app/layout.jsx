import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import {ToastContainer} from 'react-toastify';
import {GlobalProvider} from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';
export const metadata = {
  title: "Lidhoobnb",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
