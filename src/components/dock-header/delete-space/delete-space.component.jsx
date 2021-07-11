import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useActiveSpaceData } from "../../../hooks/useActiveSpaceData.hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import BoxLayer from "../../retro/box-layer/box-layer.component";
import RetroButton from "../../retro/button/retro-button.component";

import {
  deleteSpace,
  removeMember,
  updateUser,
} from "../../../firebase/firebase.utils";

import { removeOneSpace } from "../../../redux/space/space.actions";
import { setCurrentUser } from "../../../redux/user/user.actions";

const DeleteStation = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  const spaceId = useSelector((state) => state.history.spaceId);
  const activeSpaceData = useActiveSpaceData();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const currentUserUid = currentUser.uid;

  useEffect(() => {
    const { admin } = activeSpaceData;
    if (currentUserUid === admin) {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, []);

  const handleDeleteSpace = () => {
    // in favorite or assinged tasks ?
    let user = currentUser;
    let assignedArray = user.assignedTasks;
    console.log(user);
    let filter = assignedArray.filter((item) => item.fromSpaceId === spaceId);
    let result = filter[0];
    // za assign
    if (result !== undefined) {
      let taskIdtoRemove = result.id;
      let filteredAssign = assignedArray.filter(
        (item) => item.id !== taskIdtoRemove
      );
      let newUser = {
        ...user,
        assignedTasks: [...filteredAssign],
      };
      updateUser(newUser.uid, newUser);
    }
    console.log(user);
    console.log(data);

    if (user.favoriteStations.length > 0) {
      user.favoriteStations = user.favoriteStations.filter(
        (staion) => staion.fromSpaceId !== spaceId
      );
      console.log(user);
      updateUser(user.uid, user);
    }

    /* deleteSpace(spaceId);
    dispatch(removeOneSpace(spaceId));
    history.push("/"); */
  };

  return (
    <>
      {isUserAdmin ? (
        <li onClick={() => setShowAction(!showAction)}>
          <div className="tooltip">Delete</div>
          <FontAwesomeIcon icon={faTrashAlt} />
        </li>
      ) : (
        <li onClick={() => setShowAction(!showAction)}>
          <div className="tooltip">Leave</div>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </li>
      )}
      {showAction && (
        <>
          <BoxLayer type="question" setLayer={setShowAction}>
            {!isUserAdmin ? (
              <>
                <h2>Leave {data.name} Space?</h2>
                <div className="dh__btns">
                  <RetroButton mode="gray" onClick={() => setShowAction(false)}>
                    cancel
                  </RetroButton>
                  <RetroButton
                    color="danger"
                    mode="flat"
                    onClick={() => {
                      removeMember(spaceId, currentUserUid);
                      history.push("/");
                    }}
                  >
                    Leave
                  </RetroButton>
                </div>
              </>
            ) : (
              <>
                <h2>Delete {data.name} Space?</h2>
                <div className="dh__btns">
                  <RetroButton mode="gray" onClick={() => setShowAction(false)}>
                    cancel
                  </RetroButton>
                  <RetroButton
                    color="danger"
                    mode="flat"
                    onClick={() => handleDeleteSpace()}
                  >
                    Delete
                  </RetroButton>
                </div>
              </>
            )}
          </BoxLayer>
        </>
      )}
    </>
  );
};

export default DeleteStation;
