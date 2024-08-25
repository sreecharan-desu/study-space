import Footer from "../pages/Home/components/Footer/footer"; // Adjust the import path as needed

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children} {/* Render main content here */}
      </main>
      <div className="mt-96">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
