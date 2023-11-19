import React, {useEffect} from "react";
import { database } from "@/firebase";
import { ref, onValue, child, get } from "firebase/database";
import { Detail, Navbar, Task } from "@/components";
import { useCookies } from "react-cookie";

enum Priority {
  Low,
  Medium,
  High,
}

const index = () => {

  let user = null;
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  
  function isLoggedIn() {
  if (cookies.user) {
    user = cookies.user;
  } else {
    useEffect(() => {
      window.location.href = "/login";
    }, []);
  }
  }
  
  let tasks = {}

  function theRest(){
  const reference = ref(database);
  get(child(reference, `users/${user.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      tasks = snapshot.val()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  }

  function initTaskBoard(uid: string) {
    for (const [key, value] of Object.entries(tasks)) {
      console.log(`${key}: ${value}`);
    }

    // TODO: DOM Manipulation bullshit


  }


  return (
    <>
      {isLoggedIn()}
      {theRest()}
      <Navbar />
      <div className="flex">
        <div className="w-1/3 bg-neutral-300 grid grid-flow-row gap-4 p-4" id="tasklists">
          <Task
            title="Card 1"
            description="Card 1 Description"
            dueDate={new Date()}
            isCompleted={true}
            isFailed={true}
          />
          <Task
            title="Card 2"
            description="Card 2 Description"
            dueDate={new Date()}
            isCompleted={true}
            isFailed={false}
          />
          <Task
            title="Card 3"
            description="Card 2 Description"
            dueDate={new Date()}
            isCompleted={false}
            isFailed={false}
          />
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
          <Detail
            title="Card 1"
            dueDate={new Date()}
            shortDescription="Card 1 Short Description"
            description="Card 1 Description"
            priority={Priority.Low}
          />
        </div>
      </div>
    </>
  );
};

export default index;
