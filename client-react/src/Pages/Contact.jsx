
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="bg-gradient-to-tr from-slate-400 via-fuchsia-50 to-cyan-50">
        <div className="grid grid-cols-1 gap-8 px-5 py-24 mx-auto text-gray-900 rounded-lg md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                Lets talk about ArtGal
              </h2>
              <div className="mt-8 text-gray-700">
                Send us an &nbsp;
                <a className="underline" href="mailto:someone@gmail.com">
                  email
                </a>
                &nbsp; instead.
              </div>
            </div>
            <div className="mt-12 text-center">
              <img
                src="https://res.cloudinary.com/dranaclni/image/upload/v1685796281/cenIN/landingPage/images_14_cmttoh.jpg "
                alt="Contact"
              />
            </div>
          </div>
          <form>
            <div>
              <span className="text-sm font-bold text-gray-600 uppercase">
                Full Name
              </span>
              <input
                className="w-full p-3 mt-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="Enter your Name"
                required
              />
            </div>
            <div className="mt-8">
              <span className="text-sm font-bold text-gray-600 uppercase">
                Email
              </span>
              <input
                className="w-full p-3 mt-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mt-8">
              <span className="text-sm font-bold text-gray-600 uppercase">
                Phone Number
              </span>
              <input
                className="w-full p-3 mt-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                type="phone"
                placeholder="Enter your Phone Number including country code"
                required
              />
            </div>
            <div className="mt-8">
              <span className="text-sm font-bold text-gray-600 uppercase">
                Message
              </span>
              <textarea
                className="w-full h-32 p-3 mt-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your Message"
                required
              ></textarea>
            </div>
            <div className="mt-8">
              <button
                className="w-full text-center btn btn-secondary"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
     
    </>
  );
};

export default Contact;
