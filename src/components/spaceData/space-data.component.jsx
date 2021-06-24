import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setSpaceAsFavorite } from "../../firebase/firebase.utils";
import { setFavoriteSpace } from "../../redux/user/user.actions";

import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import RetroButton from "../retro/button/retro-button.component";

import "./space-data.styles.scss";

function SpaceData() {
  const spaceData = useSelector((state) => state.space.spaceData);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleFavorite = (currentUserId, spaceId) => {
    try {
      setSpaceAsFavorite(currentUserId, spaceId);
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setFavoriteSpace(spaceId));
    }
  };
  return (
    <div className="spaceData">
      <div className="sd__data">
        {spaceData.map((data) => {
          const { spaceId, color, name } = data;
          return (
            <div key={spaceId} className="sd__btn">
              <Link to={`/s/${data.spaceId}`}>
                <div className="sd__btnClick">
                  <RetroButton
                    style={{ background: color }}
                    /* key={data.stationsId} */
                  >
                    {name.charAt(0)}
                  </RetroButton>
                  <h4>{name}</h4>
                </div>
              </Link>
              {data.spaceId === currentUser.favoriteSpace ? (
                <div className="sd__favoriteActive">
                  <StarIcon />
                </div>
              ) : (
                <div className="sd__favorite">
                  <StarIcon
                    onClick={() => handleFavorite(currentUser.uid, spaceId)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="sd__something">
        <p> idea?</p>
      </div>
    </div>
  );
}

export default SpaceData;
