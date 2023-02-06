import { useEffect, useMemo, useRef, useState } from "react";
import { lsQueryConfigKey } from "constants/api";
import { fetchArticles } from "services/HNewsAPI";
import Button from "components/Button/Button";
import NewsList from "components/NewsList/NewsList";
import Modal from "components/Modal/Modal";
import useModal from "hooks/useModal";
// import { useAsyncFn } from "react-use";
import useQuery from "hooks/useQuery";

const News = () => {
  //   const [articles, setArticles] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [hitsPerPage, setHitsPerPage] = useState("10");
  const [queryModalOpen, showQueryModal, closeQueryModal] = useModal();
  const [articles, getArticles, loading, message] = useQuery([], fetchArticles);

  // const isLow = useMedia("(max-width: 480px)");
  // console.log("IS LOW", isLow);

  // const [
  //   { loading, value: articles = [], error: { message } = { message: "" } },
  //   getArticles,
  // ] = useAsyncFn(async (queryConfig) => await fetchArticles(queryConfig), []);

  // ----- our useCallback
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // const getArticles = useCallback(async (queryConfig) => {
  //   try {
  //     setLoading(true);
  //     setErrorMessage("");
  //     const articles = await fetchArticles(queryConfig);
  //     setArticles(articles);
  //   } catch (error) {
  //     setErrorMessage(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const inputRef = useRef();

  useEffect(() => {
    if (!queryModalOpen) return;
    inputRef.current.focus();
  }, [queryModalOpen]);

  const sortedArticles = useMemo(() => {
    const articlesCopy = [...articles];
    return articlesCopy.sort((a, b) => a.num_comments - b.num_comments);
  }, [articles]);

  useEffect(() => {
    const queryConfig =
      JSON.parse(localStorage.getItem(lsQueryConfigKey)) ?? {};

    getArticles(queryConfig);

    setQuery(queryConfig?.query);
    setHitsPerPage(queryConfig?.hitsPerPage);
  }, [getArticles]);

  const onKeyDown = (e) => {
    if (e.code === "Enter") {
      getArticles({ query, hitsPerPage });
    }
  };

  return (
    <>
      {queryModalOpen && (
        <Modal onClose={closeQueryModal}>
          <div>
            <input
              ref={inputRef}
              name="query"
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
              onKeyDown={onKeyDown}
            />
            <select
              name="hitsPerPage"
              value={hitsPerPage}
              onChange={({ target: { value } }) => setHitsPerPage(value)}
            >
              {[10, 30, 50].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <Button onClick={() => getArticles({ query, hitsPerPage })}>
              Search Articles
            </Button>
          </div>
        </Modal>
      )}
      {/* <ControlledForm city={this.state} /> */}
      <Button onClick={showQueryModal}>Open Search</Button>
      {loading && <h3>Loading...</h3>}
      {message && <p>{message}</p>}
      {articles?.length && !loading ? (
        <NewsList articles={sortedArticles} />
      ) : null}
    </>
  );
};

export default News;

// import { Button } from "components";
// import Modal from "components/Modal/Modal";
// import NewsList from "components/NewsList/NewsList";
// import { lsQueryConfigKey } from "constants/api";
// import { Component } from "react";
// import { fetchArticles } from "services/HNewsAPI";
// // import { getArticles } from "services/HNewsAPI";

// export default class News extends Component {
//   state = {
//     articles: [],
//     loading: false,
//     errorMessage: "",
//     query: "",
//     hitsPerPage: "10",
//     showQueryModal: false,
//   };

//   componentDidMount() {
//     const queryConfig =
//       JSON.parse(localStorage.getItem(lsQueryConfigKey)) ?? {};

//     this.setState(queryConfig);
//     this.fetchArticles(queryConfig);
//   }

//   componentDidUpdate(_, prevState) {
//     const { query, hitsPerPage } = this.state;
//     localStorage.setItem(
//       lsQueryConfigKey,
//       JSON.stringify({ query, hitsPerPage })
//     );
//     if (prevState.query !== query || prevState.hitsPerPage !== hitsPerPage) {
//       // this.fetchArticles({ query, hitsPerPage });
//     }
//   }

//   fetchArticles = async (queryConfig) => {
//     console.log("FETCH");
//     try {
//       this.setState({ loading: true, errorMessage: "" });
//       const articles = await fetchArticles(queryConfig);
//       this.setState({ articles });
//     } catch (error) {
//       this.setState({ errorMessage: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   refetchArticles = () => {
//     const { query, hitsPerPage } = this.state;
//     this.fetchArticles({ query, hitsPerPage });
//   };

//   changeValue = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   openSearchModal = () => this.setState({ showQueryModal: true });
//   closeSearchModal = () => this.setState({ showQueryModal: false });

//   // toggleSearchModal = () =>
//   //   this.setState(({ showQueryModal }) => ({
//   //     showQueryModal: !showQueryModal,
//   //   }));

//   inputKeyDown = (event) => {
//     const { query, hitsPerPage } = this.state;
//     if (event.code === "Enter") {
//       this.fetchArticles({ query, hitsPerPage });
//     }
//   };

//   render() {
//     const {
//       loading,
//       articles,
//       errorMessage,
//       query,
//       hitsPerPage,
//       showQueryModal,
//     } = this.state;

//     return (
//       <>
//         {showQueryModal && (
//           <Modal onClose={this.closeSearchModal}>
//             <div>
//               <input
//                 name="query"
//                 value={query}
//                 onChange={this.changeValue}
//                 onKeyDown={this.inputKeyDown}
//               />
//               <select
//                 name="hitsPerPage"
//                 value={hitsPerPage}
//                 onChange={this.changeValue}
//               >
//                 {[10, 30, 50].map((value) => (
//                   <option key={value} value={value}>
//                     {value}
//                   </option>
//                 ))}
//               </select>
//               <Button onClick={this.refetchArticles}>Search Articles</Button>
//             </div>
//           </Modal>
//         )}
//         {/* <ControlledForm city={this.state} /> */}
//         <Button onClick={this.openSearchModal}>Open Search</Button>
//         {loading && <h3>Loading...</h3>}
//         {errorMessage && <p>{errorMessage}</p>}
//         {articles.length && !loading ? <NewsList articles={articles} /> : null}
//       </>
//     );
//   }
// }
