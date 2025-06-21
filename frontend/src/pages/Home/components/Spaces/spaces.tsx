import React, { Suspense, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { spaces, Space, is_authenticated } from "../../../store/store";
import { FETCH_SPACES_API, NO_AUTH_GET_SPACES_API } from "../../../apis/apis";
import TopBar from "../Topbar/Topbar";

const SpaceComp = React.lazy(() => import("./space-component"));
const Heading = React.lazy(() => import("../Navbar/navbar-heading"));

export default function Spaces() {
  const [Spacess, setSpaces] = useRecoilState<Space[]>(spaces);
  const [error, setError] = useState<string | null>(null);
  const isAuth = useRecoilValue(is_authenticated);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        let url = NO_AUTH_GET_SPACES_API;
        let headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (tokenString) {
          url = FETCH_SPACES_API;
          const token = JSON.parse(tokenString);
          headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
          };
        }

        const res = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.spaces)) {
          // Filter out expired spaces
          const filteredSpaces = data.spaces.filter((space: Space) => {
            if (!space.isExpired) return space;
          });
          setSpaces(filteredSpaces.reverse()); // Set filtered spaces in Recoil state
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setError("Error fetching spaces. Please try again later.");
      }
    };
    fetchSpaces();
    setInterval(() => fetchSpaces(), 5 * 1000);
  }, [isAuth, setSpaces]);

  const validateSpaces = () => {
    let invalidSpacesCount = 0;
    Spacess.forEach((space) => {
      const isValid = space.Joined;
      if (isValid) invalidSpacesCount++;
    });
    return invalidSpacesCount;
  };

  const invalidSpacesCount = validateSpaces();
  const spacesCount = Spacess.length;

  if (invalidSpacesCount >= spacesCount && localStorage.getItem("token")) {
    return (
      <>
        <TopBar />
        <NoSpacesLandingPage isAuthenticated={isAuth} />

      </>
    );
  } else if (
    invalidSpacesCount >= spacesCount &&
    !localStorage.getItem("token")
  ) {
    return (
      <>
        <NoSpacesLandingPage isAuthenticated={isAuth} />
      </>
    );
  } else {
    return (
      <>
        {localStorage.getItem("token") ? (
          <>
            <TopBar />

            <div className="m-10">
              <Suspense fallback={<div>Loading Heading...</div>}>
                <Heading text="/Today's Spaces" />
              </Suspense>
            </div>
          </>
        ) : (
          <>
            <div className="m-10 font-bold text-2xl text-center first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl">
              Welcome to StudySpace!
            </div>
            <div className="m-10">
              <Suspense fallback={<div>Loading Heading...</div>}>
                <Heading text="/Today's Spaces" />
              </Suspense>
            </div>
          </>
        )}
        <div>
          {error ? (
            <div className="flex bg-white text-2xl font-bold justify-center text-center p-4">
              {error}
            </div>
          ) : Spacess.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-2">
              {Spacess.map((space) => (
                <Suspense
                  key={space._id}
                  fallback={<div>Loading Space...</div>}>
                  <SpaceComp
                    space_id={space._id}
                    description={space.Description}
                    heading={space.Title}
                    subjectName={space.Subject}
                    time={
                      space.FromTime.toString().split("T")[1].split(".")[0] +
                      " to " +
                      space.ToTime.toString().split("T")[1].split(".")[0]
                    }
                    date={space.DateCreatedOn}
                    venue={space.Venue}
                    Joined={space.Joined}
                    author={space.Author}
                    memberCount={space.Users.length}
                  />
                </Suspense>
              ))}
            </div>
          ) : (
            <div className="ml-10">
              There are no new spaces available. Go to Joined spaces to see the
              spaces you joined.
            </div>
          )}
        </div>
      </>
    );
  }
}
import {useRef} from "react";
import Button from "../Navbar/Button";
import { Plus, Users, BookOpen, Search, ArrowRight, GraduationCap, Lightbulb } from "lucide-react";

export function NoSpacesLandingPage({ isAuthenticated = false }) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = (heroRef.current as HTMLElement).getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const features = [
    { 
      icon: BookOpen, 
      title: "Focused Study", 
      description: "Distraction-free environment designed for deep learning",
      delay: 0
    },
    { 
      icon: Users, 
      title: "Study Groups", 
      description: "Connect with motivated peers who share your goals",
      delay: 100
    },
    { 
      icon: "Search", 
      title: "Smart Discovery", 
      description: "Find the perfect study space that matches your needs",
      delay: 200
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`relative min-h-screen flex flex-col justify-center items-center px-6 transition-opacity duration-1000 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Abstract SVG Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_80%)]" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Floating Elements */}
        <div
          className="absolute w-24 h-24 rounded-full border border-gray-200"
          style={{
            top: `${Math.sin(scrollY * 0.01) * 100 + 100}px`,
            left: `${Math.cos(scrollY * 0.01) * 100 + 100}px`,
            transition: 'all 0.5s ease',
            opacity: 0.2,
          }}
        />
        <div
          className="absolute w-40 h-40 rounded-full border border-gray-200"
          style={{
            bottom: `${Math.cos(scrollY * 0.02) * 120 + 150}px`,
            right: `${Math.sin(scrollY * 0.02) * 120 + 150}px`,
            transition: 'all 0.7s ease',
            opacity: 0.2,
          }}
        />

        {/* Animated SVG Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g className="opacity-10">
              {/* Book */}
              <g style={{
                transform: `translate(${window.innerWidth - 120 + Math.cos(scrollY * 0.015) * 30}px, ${window.innerHeight - 150 + Math.sin(scrollY * 0.025) * 30}px)`,
                transition: 'transform 0.6s ease'
              }}>
                <path d="M4 19.5V5C4 3.89543 4.89543 3 6 3H20L20 19.5C20 19.5 19 19.5 18 19.5C17 19.5 16 20 16 20H8C8 20 7 19.5 6 19.5C5 19.5 4 19.5 4 19.5Z" stroke="black" fill="none" strokeWidth="1" />
                <path d="M12 3V12L15 10L18 12V3" stroke="black" fill="none" strokeWidth="1" />
              </g>
              {/* Users */}
              <g style={{
                transform: `translate(${window.innerWidth - 100 + Math.cos(scrollY * 0.01) * 15}px, ${100 + Math.sin(scrollY * 0.02) * 15}px)`,
                transition: 'transform 0.5s ease'
              }}>
                <circle cx="9" cy="7" r="4" stroke="black" fill="none" strokeWidth="1" />
                <path d="M3 21V17C3 15.8954 3.89543 15 5 15H13C14.1046 15 15 15.8954 15 17V21" stroke="black" fill="none" strokeWidth="1" />
                <circle cx="17" cy="9" r="3" stroke="black" fill="none" strokeWidth="1" />
                <path d="M13 21V18C13 16.8954 13.8954 16 15 16H19C20.1046 16 21 16.8954 21 18V21" stroke="black" fill="none" strokeWidth="1" />
              </g>
            </g>
          </svg>
        </div>

        {/* Interactive Mouse Movement Background Effect */}
        <div
          className="absolute w-full h-full opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.2) 0%, transparent 50%)`,
            transition: 'background 0.2s ease',
          }}
        />

        <div className="max-w-4xl text-center z-10 space-y-8">
     

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter">
            Study<span className="relative">Space
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-light text-gray-700 max-w-2xl mx-auto leading-relaxed relative">
            <svg className="absolute -left-10 top-0 w-6 h-6 stroke-gray-300 animate-spin opacity-30" style={{ animationDuration: '8s' }}>
              <circle cx="12" cy="12" r="10" strokeWidth="1" fill="none" />
              <path d="M12 6V12L16 14" strokeWidth="1" fill="none" />
            </svg>
            {isAuthenticated
              ? "Your learning journey awaits"
              : "Join a community of focused learners"}
            <svg className="absolute -right-10 -bottom-2 w-6 h-6 stroke-gray-300 animate-spin opacity-30" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1" fill="none" />
              <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1" />
              <line x1="4" y1="12" x2="20" y2="12" strokeWidth="1" />
            </svg>
          </p>

          {/* CTA Section */}
          <div className="relative flex justify-center space-x-4 pt-6">
            <div className="absolute -left-16 top-0 transition-transform duration-300 transform translate-y-0 hover:translate-y-1 opacity-20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </div>
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-14 w-40 rounded-full" />}>
                  <Button
                    text={
                      <span className="relative z-10 flex items-center gap-3">
                        <Plus size={20} />
                        Create Space
                      </span>
                    }
                    space_id=""
                    className="group relative px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                  />
                </Suspense>
                <Button
                  text={
                    <span className="relative z-10 flex items-center gap-3">
                      <Search size={20} />
                      Browse Spaces
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  }
                  space_id=""
                  className="group relative px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                />
              </div>
            ) : (
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-14 w-48 rounded-full mx-auto" />}>
                {/* @ts-expect-error --- */}
                <Button
                  text={
                    <span className="relative z-10 flex items-center gap-2">
                      <Plus size={20} />
                      Get Started
                    </span>
                  }
                  space_id=""
                >
                  <span className="absolute inset-0 bg-black z-0 group-hover:scale-x-110 transition-transform duration-300"></span>
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-700"
                  />
                </Button>
              </Suspense>
            )}
            <div className="absolute -right-16 bottom-0 transition-transform duration-300 transform translate-y-0 hover:-translate-y-1 opacity-20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-3 mt-4">
      
            <span className="inline-flex items-center text-sm text-gray-500 font-light">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Built for <span className="font-medium"> focused learning</span>
            </span>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <div className="animate-bounce cursor-pointer group">
              <svg 
                className="transition-transform group-hover:-translate-y-1" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {!isAuthenticated && (
        <div className="py-20 px-6 bg-gray-50 relative overflow-hidden">
          {/* Background SVG pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="diagonalLines" width="10" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: "black", strokeWidth: 0.5 }} />
              </pattern>
              <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12 relative">
              <svg className="absolute -top-12 -left-4 w-8 h-8 text-gray-300 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight inline-flex items-center justify-center">
                <span className="relative">
                  Study Smarter

                </span>
                <span className="mx-3 inline-block w-1 h-8 bg-gray-300"></span>
                <span>Not Harder</span>
              </h2>
              <div className="mt-2 h-1 w-16 bg-black mx-auto"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto relative">
                Tools built for focus and collaboration.
                <svg className="absolute -right-12 -bottom-6 w-10 h-10 text-gray-200 opacity-30 animate-spin" style={{ animationDuration: '15s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md transform relative group ${scrollY > 300 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-5 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gray-100 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
                      <div className="relative z-10">
                        <Icon className={`transition-colors duration-300 ${hoveredCard === index ? 'text-black' : 'text-gray-600'}`} size={28} />
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 relative">{feature.title}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-10 transition-all duration-300" />
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed relative z-10">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <div className="py-24 px-6 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute left-10 top-20 opacity-20" width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDuration: '7s' }} />
            <circle cx="60" cy="60" r="30" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDuration: '5s' }} />
            <circle cx="60" cy="60" r="20" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDuration: '3s' }} />
          </svg>
          <svg className="absolute right-10 bottom-10 opacity-20" width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="20" width="80" height="80" rx="40" stroke="white" strokeWidth="1" fill="none" transform="rotate(45 50 50)" className="animate-pulse" style={{ animationDuration: '8s' }} />
            <rect x="20" y="20" width="60" height="60" rx="30" stroke="white" strokeWidth="1" fill="none" transform="rotate(45 50 50)" className="animate-pulse" style={{ animationDuration: '6s' }} />
            <rect x="30" y="30" width="40" height="40" rx="20" stroke="white" strokeWidth="1" fill="none" transform="rotate(45 50 50)" className="animate-pulse" style={{ animationDuration: '4s' }} />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <svg className="w-14 h-14 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" />
              <path d="M12 16V12M12 8H12.01" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            Ready to Transform Your Study Routine?
            <div className="absolute -right-16 top-0">
              <svg className="w-12 h-12 text-gray-700 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M14.5 3.5 14.5 3.5C3.5 14.5 5.5 4 12 5.5.5C9.5 5.5 9.5 3.5 9.5 3.5M16.5 20.5H7.5C6 18 7 12.5 5 12.5.5C12 12.5 18 12.5 18 16.5M16 12C5M15 12 15 12 12 12 5M16.5 12.5C14.5M7.5 9.5C7.5 11.5 9 12 9 12 9C9 12 12 7.5 12.5C14.5" />
</svg>
            </div>
          </h2>

          <p className="text-gray-300 mb-8 relative">
            <span className="relative inline-block">
              {isAuthenticated ? "Start creating your space now" : "Join the NoSpaces community today"}
              <svg className="absolute -left-8 -bottom-4 w-6 h-6 text-gray-600 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 2L15 6L22 10" />
                <path d="M2 12H22" />
                <path d="M6 22L2 18L6 14" />
              </svg>
            
          </span>
          </p>

            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-14 w-40 rounded-full" />}>
                  <Button
                    text={
                      <span className="relative flex items-center gap-2">
                        <Plus size="20" />
                        Create Space
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                
                    }
                    space_id=""
                    className="group inline-block px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md relative overflow-hidden"
                  />
                </Suspense>
                {/* @ts-expct-error --- */}
                <Button
                  text={
                    <span className="relative flex items-center gap-2">
                      <Search size="20" />
                      Browse Spaces
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  }
                  space_id=""
                  className="group inline-block px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md relative overflow-hidden"
                />
                </div>
            ) : (
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-14 w-48 rounded-full mx-auto" />}>
                                {/* @ts-expect-error --- */}

                <Button
                  text={
                    <span className="relative flex items-center justify-center">
                      Get Started
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7-7 7" />
                      </svg>
                    </span>
                  }
                  space_id=""
                  className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md relative group overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 bg-gray-200 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="absolute inset-0 w-full text-right text-black pr-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-10">S</span>
                </Button>
              </Suspense>
            )}

          <div className="mt-12 flex justify-center space-x-6 opacity-70">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-xs">Academic Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs">Community Collaboration</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-2">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <p className="text-xs">Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
