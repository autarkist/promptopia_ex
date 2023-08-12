import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex items-center justify-center flex-col">
      <h1 className="text-5xl mt-5 font-extrabold leading-[1.15] text-black  text-center">
        Discover & Share
        <br className="max-w-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      <Feed  />
    </section>
  )
}

export default Home 