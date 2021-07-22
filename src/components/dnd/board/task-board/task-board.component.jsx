import React, { useEffect, useState, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLinesVertical,
  faExpandAlt,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./task-board.styles.scss";

import LoadModule from "../../../modules/load-module.component.jsx/load-module.component";
import BoxRight from "../../../retro/box-right/box-right.component";
import LargeTask from "../../../large-task/large-task.component";

import { updateUser, db } from "../../../../firebase/firebase.utils";

const TaskBoard = ({ task, index }) => {
  const activeModules = useSelector((state) => state.space.activeModulesData);
  const users = useSelector((state) => state.user.users);
  const filter = useSelector((state) => state.filter);

  const [showLargeTask, setShowLargeTask] = useState(false);
  const [taskInfilter, setTaskInFilter] = useState(true);
  const [msgs, setMsgs] = useState(0);

  useEffect(() => {
    console.log(filter);
    // what is this task ?
    const thisTaskIs = task.priority.filter((item) => item.active !== true);
    const thisTask = thisTaskIs[0].name.toLowerCase();

    // ok. is urgent on ?
    console.log(filter);
    const i = filter.status.findIndex((item) => item.name === thisTask);
    if (i >= 0) {
      const statusIs = filter.status[i].status;
      console.log(statusIs);
      if (!statusIs) {
        setTaskInFilter(false);
      } else {
        setTaskInFilter(true);
      }
    }
  }, [task, filter]);

  useEffect(() => {
    // AUTO UPDATE TASKS
    if (!users) return;
    let getUser = users.filter((item) => item.uid === task.assign);
    let user = getUser[0];

    if (!task.assign) return;
    if (user === undefined) return;

    const gotTask = user.assignedTasks.filter((item) => item.id === task.id);
    const gotTaskRes = gotTask[0];

    if (gotTaskRes === undefined) {
      return;
    } else {
      let copyUser = user;
      let deleteOldTask = copyUser.assignedTasks.filter(
        (item) => item.id !== task.id
      );
      deleteOldTask.push(task);
      let newUser = {
        ...copyUser,
        assignedTasks: [...deleteOldTask],
      };
      updateUser(user.uid, newUser);
    }
  }, [task]);

  useMemo(() => {
    const { fromSpaceId, fromStationId, id } = task;
    if (msgs === 0) {
      db.collection("space")
        .doc(fromSpaceId)
        .collection("stations")
        .doc(fromStationId)
        .collection("tasks")
        .doc("tasks")
        .collection("msg")
        .where("taskId", "==", id)
        .get()
        .then((msgsData) => {
          if (!msgsData.empty) {
            setMsgs(msgsData.size);
          }
        });
    }
  }, [msgs]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        const style = {
          ...provided.draggableProps.style,
        };
        return (
          <>
            {taskInfilter && (
              <div
                className="task"
                {...provided.draggableProps}
                ref={provided.innerRef}
                style={style}
              >
                <div className="task__drag" {...provided.dragHandleProps}>
                  <FontAwesomeIcon icon={faGripLinesVertical} />
                </div>
                <div className="task__header">
                  <div className="task__taskName">
                    <p>{task.content}</p>
                  </div>
                  <div
                    className="task__expand"
                    onClick={() => setShowLargeTask(!showLargeTask)}
                  >
                    <FontAwesomeIcon icon={faExpandAlt} />
                  </div>
                  {msgs > 0 && (
                    <div className="task__comments">
                      <FontAwesomeIcon icon={faCommentAlt} />
                      <p>{msgs}</p>
                    </div>
                  )}
                </div>
                <div className="task__modules">
                  {activeModules?.map((module) => {
                    return (
                      <LoadModule
                        module={module}
                        key={module.name}
                        task={task}
                        style="box"
                      />
                    );
                  })}
                </div>
                <AnimatePresence>
                  {showLargeTask && (
                    <BoxRight
                      setLayer={setShowLargeTask}
                      setLayer={setShowLargeTask}
                    >
                      <LargeTask task={task} msgs={msgs} />
                    </BoxRight>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        );
      }}
    </Draggable>
  );
};

export default TaskBoard;
