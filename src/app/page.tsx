import Link from "next/link";


export default async function Home() {

  return (
    <div className=" mt-48 w-full flex justify-center items-center flex-col gap-8 p-8">
      <h1 className="text-center text-3xl font-bold md:text-4xl lg:text-7xl bg-clip-text ">
        Just finished watching a movie or show and craving more?
      </h1>
      <p className="text-center text-base md:text-lg lg:text-2xl">
        Enter the name of a movie or show to get related content
      </p>
      <Link href='/movies' type="button" className="flex items-center text-center text-base focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-400 font-medium rounded-lg px-5 py-3 dark:focus:ring-yellow-900">
        Get recommendations!
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        </Link>
    </div>
  );
}
