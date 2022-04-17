import AppContainer from "./AppContainer";
import Header from "./Header";
// import { Counter } from "./mock/Counter";

export default function About() {
  return (
    <AppContainer>
      <Header title="About Page" />
      {/* <Counter /> */}
      <div className="my-5 mx-2 flex justify-center py-5 px-2">
        <h1 className="text-4xl font-bold">
          Filler Page for practicing Raviger :D!
        </h1>
      </div>
    </AppContainer>
  );
}
