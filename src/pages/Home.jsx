import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";

function Home() {
  return (
    <div>
      <section className="grid grid-cols-12 Gap relative">
        <div className="col-span-3 max-lg:hidden sticky bottom-0 self-end h-[calc(100vh-120px)] mb20">
          <LeftHome />
        </div>
        
        <div className="col-span-9 max-lg:col-span-full mt-[67px]">
          <RightHome />
        </div>
      </section>
    </div>
  );
}
  
export default Home;