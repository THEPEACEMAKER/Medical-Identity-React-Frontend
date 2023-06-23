import React, { useState } from "react";

import styles from "./styleSearch.module.css";
import { Link } from "react-router-dom";
import api from "../../../api/api";

export const Search = ({ categories }) => {
  const [selectedValue, setSelectedValue] = useState(false);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // &category__name=sport
  let timeout;
  const [tableVisible, setTableVisible] = useState(false);
  const [resError, setResError] = useState();
  const [dataSearch, setDataSearch] = useState();

  const onKeySearch = ($event) => {
    clearTimeout(timeout);
    if ($event.target.value.trim() !== "") {
      timeout = setTimeout(() => {
        if ($event.keyCode !== 13) {
          api
            .get(
              `/products?search=${$event.target.value.trim()}&${
                selectedValue && `&category__name=${selectedValue}`
              }`
            )
            .then((res) => {
              setResError("");
              setTableVisible(true);
              setDataSearch(res.data.results);
            })
            .catch((err) => {
              console.log(err.originalError.response.data);
              setResError("Not Found");
            });
        }
      }, 1000);
    } else {
      setTableVisible(false);
    }
  };

  return (
    <div className="position-relative m-auto w-75 my-2">
      <form className={`${styles.search} d-flex `} role="search">
        <select
          className={`form-select form-select-sm w-25 border-end-0 rounded-0 `}
          aria-label=".form-select-lg example"
          defaultValue={selectedValue}
          onChange={handleSelectChange}
        >
          <option value="default" disabled>
            Category
          </option>
          {categories &&
            categories.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name}
              </option>
            ))}
        </select>

        <input
          className={`form-control w-100 rounded-0 border-start-0  `}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onKeyUp={onKeySearch}
          onBlur={() => setTimeout(() => setTableVisible(false), 100)}
          onFocus={() => setTableVisible(true)}
        />
      </form>
      {tableVisible && (
        <div className={styles.divTable}>
          <table className={styles.table}>
            <div>
              {dataSearch &&
                dataSearch.map((el) => (
                  <Link
                    to={`/product/${el.id}`}
                    className={styles.a}
                    key={el.id}
                  >
                    <div className="d-flex align-items-center gap-3 p-0">
                      <img
                        className={styles.img}
                        src={`https://res.cloudinary.com/ddk98mjzn/${
                          el.images.length && el.images[0].image
                        }`}
                        alt="productImage"
                      />

                      <span>{el.name}</span>
                    </div>
                  </Link>
                ))}
            </div>
            {resError && (
              <tr>
                <td>
                  {" "}
                  <div className="text-center font-weight-bold">{resError}</div>
                </td>
              </tr>
            )}

            <tfoot className={styles.tfoot}>
              <td className="text-center" colSpan="2">
                See More
              </td>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
