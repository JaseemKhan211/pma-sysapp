import WelCome from "./welcome/WelCome";

export const metadata = {
  title: "PAM | Welcome",
};

export default function Home() {
  return <WelCome />;
}


// OLD CODE :EMOJI BAD
// import { redirect } from 'next/navigation';

// export default function Home() {
//   redirect('/login');
// }