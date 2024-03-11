import { SparklesCore } from '@/ui/sparkles';
import { getCourses } from './courses/course.query';
import { CardBody, CardContainer, CardItem } from '@/ui/3d-card';
import Link from 'next/link';

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="relative flex h-full w-full flex-col justify-center  overflow-scroll rounded-md ">
      {/* <div className="absolute w-full h-full"> */}
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute h-full w-full"
        particleColor="#FFFFFF"
      />

      <h1 className="mb-6 text-center text-3xl font-bold text-white md:text-7xl lg:text-6xl">
        Just Code
      </h1>
      <h2 className="mb-8 text-2xl font-bold text-center text-white md:text-2xl">
        Find the best courses for the best results
      </h2>
      <h2 className="mb-8 text-2xl font-bold text-center text-white md:text-2xl">
        and create your own courses!
      </h2>

      <div>
        <h2 className="text-center text-2xl font-bold text-white md:text-2xl">
          Our best courses
        </h2>
        <div className="flex flex-wrap justify-center gap-8  mt-16">
          {courses.slice(0, 3).map((course) => (
            <Link key={course.id} href={`courses/${course.id}`}>
              <CardContainer className="inter-var">
                <CardBody className="group/card h-auto  w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[25rem]  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {course.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                  >
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                  >
                    <img
                      src={course.image}
                      height="500"
                      width="500"
                      className="h-36 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                      alt="course image"
                    />
                  </CardItem>
                  <div className="mt-12 flex items-center justify-between">
                    <CardItem
                      translateZ={20}
                      translateX={-40}
                      as="button"
                      className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                    >
                      Try now →
                    </CardItem>

                    <CardItem
                      translateZ={20}
                      translateX={40}
                      as="button"
                      className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                    >
                      See the course
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </Link>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
    // <div className="flex flex-col gap-4">
    //   <h1 className="m-auto text-3xl">JustCode - Find the best courses</h1>
    //   <h2>Post you courses and get new students!</h2>
    // </div>
  );
}
