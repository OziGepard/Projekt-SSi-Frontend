import {
  Star,
  Https,
  MilitaryTech,
  LockPerson,
  Key,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Paper,
  List,
  ListSubheader,
  ListItemButton,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import SearchBar from "../Search/SearchBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import UserModal from "../UserModal/UserModal";

type User = {
  id: number;
  username: string;
  role: string;
  blocked: boolean;
};

export const UserList = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({
    id: -1,
    username: "",
  });
  const { userFilter } = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);
  const filteredUsers = users.filter((user) =>
    user.username.includes(userFilter)
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:4567/admin/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
  });

  const handleSelectedUserChange = (username: string, id: number) => {
    setSelectedUser({
      id: id,
      username: username,
    });
  };

  const handleModalState = () => {
    setOpen((prev) => !prev);
  };

  const handlechangePrivilages = () => {
    changePrivilages();
  };

  const handlechangeBlockedStatus = () => {
    changeBlockedStatus();
  };

  const handleChangeUserPassword = () => {
    changeUserPassword();
  };

  const changeUserPassword = () => {
    axios
      .put(
        `http://localhost:4567/admin/user/changePassword/${selectedUser.id}`,
          "DefaultPassword123!",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(() => {
        setMessage(`Hasło użytkownika ${selectedUser.username} zostało zmienione na DefaultPassword123!`)
        handleModalState();
      });
  };

  const changeBlockedStatus = () => {
    const user = users.find((user) => {
      return user.username === selectedUser.username;
    });
    if (user != null) {
      var changedBlockedStatus = false;
      if (user?.blocked == false) {
        changedBlockedStatus = true;
      } else {
        changedBlockedStatus = false;
      }
      axios.put(
        "http://localhost:4567/admin/user",
        {
          id: user!!.id,
          username: user!!.username,
          role: user!!.role,
          blocked: changedBlockedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
    }
  };

  const changePrivilages = () => {
    const user = users.find((user) => {
      return user.username === selectedUser.username;
    });
    if (user != null) {
      var changedPrivilege = "";
      if (user?.role == "CLIENT") {
        changedPrivilege = "ADMIN";
      } else {
        changedPrivilege = "CLIENT";
      }
      axios.put(
        "http://localhost:4567/admin/user",
        {
          id: user!!.id,
          username: user!!.username,
          role: changedPrivilege,
          blocked: user!!.blocked,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
    }
  };

  return (
    <Box
      component={Paper}
      elevation={6}
      borderRadius={"40px"}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "3rem",
      }}
    >
      <List
        sx={{
          borderTopLeftRadius: "40px",
          borderBottomLeftRadius: "40px",
          p: "2rem",
        }}
        component={Paper}
        elevation={4}
      >
        <ListSubheader>Manage Users</ListSubheader>
        <ListSubheader>
          <SearchBar placeholder="Search users..." type="users" />
        </ListSubheader>
        <Box sx={{ overflow: "auto", height: "75%", mt: "1rem" }}>
          {filteredUsers.map((user, index) => (
            <ListItemButton
              key={`user-list-${user.username}-${index}`}
              sx={{
                backgroundColor:
                  selectedUser.username === user.username ? "beige" : "",
              }}
              onClick={() => {
                handleSelectedUserChange(user.username, user.id);
              }}
            >
              <ListItem
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                {user.role === "ADMIN" && <Star />}
                {user.role === "CLIENT" && <Person />}

                <Typography>{user.username}</Typography>

                {user.blocked === true && <Https />}
              </ListItem>
            </ListItemButton>
          ))}
        </Box>
      </List>
      <Box
        sx={{
          mt: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "25%",
        }}
      >
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Operations
        </Typography>
        <Button variant="text" onClick={handlechangePrivilages}>
          <MilitaryTech sx={{ mr: "1rem" }} /> Change Privileges
        </Button>
        <Button variant="text" onClick={handlechangeBlockedStatus}>
          <LockPerson sx={{ mr: "1rem" }} /> Block / Unblock
        </Button>
        <Button variant="text" onClick={handleChangeUserPassword}>
          <Key sx={{ mr: "1rem" }} /> Reset Password
        </Button>
      </Box>
      <UserModal handleCloseOrOpen={handleModalState} open={open} message={message} />
    </Box>
  );
};
