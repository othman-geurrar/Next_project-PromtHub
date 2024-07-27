import { Nav } from "@/components/Nav";
import Provider from "@/components/ui/Provider";



export const metadata = {
  title: "PromptHub",
  description: "A webstite when you find AI prompt",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
