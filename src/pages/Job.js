import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchJob,
  fetchJobBasedOnId,
  fetchJobIds,
  fetchSingleJob,
} from "../features/actions/jobAction";

const Job = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 6;
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [jobDetails, setJobDetails] = useState([]);

  const { isLoading, isSuccess, isError, jobsId, jobsData } = useSelector(
    (state) => state.job
  );

  const fetchItems = (currPage) => {
    try {
      setCurrentPage(currPage);
      setFetchingDetails(true);
      const itemsIdsForPage = jobsId.slice(
        currPage * ITEMS_PER_PAGE,
        currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
      Array.isArray(itemsIdsForPage) &&
        itemsIdsForPage.length > 0 &&
        itemsIdsForPage.forEach((id) => {
          dispatch(fetchJobBasedOnId(id));
        });
    } catch (error) {}
  };

  useEffect(() => {
    jobsId?.length === 0 && dispatch(fetchJobIds());
  }, [jobsId]);

  useEffect(() => {
    jobsId !== null && setItemIds(jobsId);
  }, [itemIds]);

  useEffect(() => {
    jobsData?.length === 0 && jobsId?.length > 0 && fetchItems(0);
  }, [jobsData, jobsId]);

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          {Array.isArray(jobsData) &&
            jobsData?.length > 0 &&
            jobsData?.map((item) => {
              return (
                <>
                  <div className="col-md-4 my-3" key={item?.id}>
                  <Link to={item?.url} target="_blank" className={item?.url ? "" : "inactiveLink"} style={{textDecoration:"none"}}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{item?.title.slice(0,30)}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {(item?.type).toUpperCase()}
                        </h6>
                        <p>By:-{(item?.by).toUpperCase()}</p>
                        <p>{new Date(item?.time * 1000).toLocaleString()}</p>
                      </div>
                    </div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
        <button
          className="btn btn-danger w-20"
          onClick={() => fetchItems(currentPage + 1)}
        >
          Load More Jobs...
        </button>
      </div>
    </div>
  );
};

export default memo(Job);
