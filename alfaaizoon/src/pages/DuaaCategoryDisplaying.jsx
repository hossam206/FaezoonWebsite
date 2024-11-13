import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoDataFounded from "/images/No data/55024593_9264820.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import _ from "lodash";
// Import Components
import NewNavbar from "../_Components/NewNavbar";

import { fetchSearchResult } from "../Rtk/slices/SearchSlice";
import { getCount, getItemsByCategory } from "../Services/TutorialService";
import { highlightText } from "../assets/HighlightText";
import Pagination from "../_Components/Pagination";
import FixedHeader from "../_Components/FixedHeader";
import { useEffect, useState } from "react";
import DuaComponent from "../_Components/DuaComponent";
import Footer from "../_Components/footer";
export default function DuaaCategoryDisplaying() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const loadLimit = import.meta.env.VITE_API_LOAD_LIMI;
  const fetchDataStatus = useSelector((state) => state.fetchedData.status);
  const AllHadith = useSelector((state) => state.fetchedData.DuasItems);
  const searchStatus = useSelector((state) => state.search.status);
  const searchResult = useSelector((state) => state.search.searchresult);

  // Local states
  const [playingId, setPlayingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [DuasItems, setDuasItems] = useState([]);

  // Handle Audio Play/Pause
  const handlePlayAudio = (id) => {
    setPlayingId((prevPlayingId) => (prevPlayingId === id ? null : id));
  };

  // Handle Search with Debouncing
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      debouncedFetch(value);
    }
  };

  const debouncedFetch = _.debounce((searchValue) => {
    dispatch(
      fetchSearchResult({ path: "/douas/search", searchWord: searchValue })
    );
  }, 300);

  // load Duas for Choosed Category
  const loadDuas = async () => {
    try {
      const data = await getItemsByCategory("douas", categoryName);
      setDuasItems(data);
    } catch (error) {
      console.log("error print duas", error);
    }
  };

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  // Load Categories with Counts
  const categoryNames = [
    { name: "Hadeeth", path: "hadiths" },
    { name: "Athkaar", path: "azkars" },
    { name: "Aqeedah", path: "aqidahs" },
    { name: "Duas", path: "douas" },
    { name: "Arboon Nawwai", path: "arboonNawwis" },
  ];
  useEffect(() => {
    const fetchcategoryData = async () => {
      try {
        const categoryData = await Promise.all(
          categoryNames.map(async (category) => {
            const count = await getCount(category.path);

            return { name: category.name, count, link: category.path };
          })
        );
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcategoryData();
  }, []);
  return (
    <>
      <NewNavbar />
      <FixedHeader subtitle={"Duaa"} />
      <div className="py-10 container">
        <div className="grid grid-cols-12 md:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-9 col-span-12 h-fit">
            <input
              className="Dashboardinput cursor-pointer !w-full lg:hidden :block"
              placeholder="Search here"
              autoFocus
              onKeyUp={handleSearch}
            />
            <div>
              {/* Loading Search DuasItems */}
              {searchValue && searchStatus === "Loading..." && (
                <div className="flex flex-row items-center justify-center w-full overflow-hidden">
                  <div className="loader w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Display Search DuasItems */}
              {searchValue &&
                searchStatus === "Success" &&
                searchResult.length > 0 && (
                  <div>
                    {searchResult.map((Dua) => (
                      <DuaComponent
                        key={Dua._id}
                        DuaName={Dua.name}
                        DuaNumber={Dua.hID}
                        DuaArabic={highlightText(Dua.arabic, searchValue)}
                        DuaEnglish={highlightText(Dua.english, searchValue)}
                        DuaId={Dua._id}
                        isPlaying={playingId === Dua._id}
                        onPlayAudio={handlePlayAudio}
                      />
                    ))}
                  </div>
                )}

              {/* No Search DuasItems */}
              {searchValue && DuasItems?.length === 0 && (
                <div className="lg:w-[360px] lg:h-[360px] mx-auto">
                  <img src={NoDataFounded} alt="No Data Found" />
                  <p className="flex flex-row items-center justify-center text-center text-xl my-2 font-medium py-2">
                    No DuasItems found. Please try a different search term.
                  </p>
                </div>
              )}

              {/* Loading Default Hadiths */}
              {!searchValue && fetchDataStatus === "Loading..." && (
                <div className="flex flex-col items-start gap-6 w-full">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="w-full">
                      <Skeleton height={20} width="20%" />
                      <Skeleton height={200} width="100%" />
                    </div>
                  ))}
                </div>
              )}

              {/* Display Default Hadiths */}
              {!searchValue && DuasItems?.douas?.length > 0 && (
                <div>
                  {DuasItems?.douas?.map((Dua) => (
                    <DuaComponent
                      key={Dua._id}
                      DuaName={Dua.name}
                      DuaNumber={Dua.dID}
                      DuaArabic={Dua.arabic}
                      DuaEnglish={Dua.english}
                      DuaId={Dua._id}
                      isPlaying={playingId === Dua._id}
                      onPlayAudio={handlePlayAudio}
                    />
                  ))}
                </div>
              )}

              {/* No Hadiths Fetched */}
              {!searchValue &&
                fetchDataStatus === "success" &&
                AllHadith?.hadiths?.length === 0 && (
                  <p className="text-center font-medium">
                    No hadiths available.
                  </p>
                )}

              {/* Pagination */}
              {!searchValue && DuasItems?.douas?.length > 0 && (
                <div className="pt-8 mx-auto">
                  <Pagination
                    currentPage={currentPage}
                    pagecount={DuasItems?.pagesCount}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 col-span-12 py-[10px]">
            {/* Search Bar */}
            <input
              className="Dashboardinput cursor-pointer !w-full hidden lg:block"
              placeholder="Search here"
              autoFocus
              onKeyUp={handleSearch}
            />
            <div className="text-center py-4">
              <h2 className="text-left font-light  text-[20px] pb-2 flex flex-row items-center justify-start gap-6">
                Important
                <hr className="border-t border-solid border-gray-300 w-full" />
              </h2>
              <p className="font-english leading-relaxed  font-medium text-[16px] text-[#5f6068]">
                In Islam,Du'a is a means of connecting with Allah, seeking
                His guidance, forgiveness, and support. It reflects reliance on
                God in all aspects of life and is a valued act of worship.
                Supplication helps to strengthen faith and brings peace to the
                hearts of believers, whether in times of ease or hardship.
              </p>
            </div>
            <div className="text-center py-8 ">
              <h2 className="text-left font-light  text-[20px] pb-2 flex flex-row items-center justify-start gap-6">
                Categories{" "}
                <hr className="border-t border-solid border-gray-300 w-full" />
              </h2>

              <div className="flex flex-col items-start space-y-4">
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/Tutorials/${category.link}`}
                      className="flex flex-row items-center justify-between rounded-md overflow-hidden w-full bg-[#F2F2F2] cursor-pointer hover:translate-x-2 transition-transform duration-300 group capitalize"
                    >
                      <div className="text-textColor p-2 font-semibold">
                        {category.name}
                      </div>
                      <div className="bg-[#343746] py-2 px-4 text-white group-hover:bg-[#005A8C]">
                        {category?.count?.count}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="flex flex-col items-start w-full space-y-2">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <Skeleton key={index} height={20} width={200} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </>
  );
}
