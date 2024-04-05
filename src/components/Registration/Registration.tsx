import styles from "../../styles/Authorization.module.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { IUserAuth } from "../../models/IUser.ts";
import { useStores } from "../../rootStoreContext.ts";
import {Role} from "../../models/Role.ts";

const Registration = () => {
  const [userAuth, setUserAuth] = useState<IUserAuth>({
    role: "Employ",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { userStore } = useStores();

  async function registration(userAuth: IUserAuth) {
      await userStore.authorization(userAuth);
      navigate("/");
  }

  return (
    <div className={styles.loginBlock}>
      <div className={styles.loginContent}>
        <div className={styles.inputBlock}>
          <input
              placeholder={"Email"}
              type={"text"}
              className={styles.inputData}
              value={userAuth.email}
              onChange={(e) =>
                  setUserAuth({...userAuth, email: e.target.value})
              }
          />
          <input
              placeholder={"Должность"}
              type={"text"}
              className={styles.inputData}
              value={userAuth.email}
              onChange={(e) =>
                  setUserAuth({...userAuth, email: e.target.value})
              }
          />
          <input
              placeholder={"Пароль"}
              type={"password"}
              className={styles.inputData}
              value={userAuth.password}
              onChange={(e) =>
                  setUserAuth({...userAuth, password: e.target.value})
              }
          />
        </div>
        <div className={styles.roleBlock}>
          <div className={styles.textRole}>Выберите роль</div>
          <select
              className={styles.selectBlock}
              value={userAuth.role}
              onChange={(e) => setUserAuth({...userAuth, role: e.target.value})}
          >
            <option value={Role.Employ}>Сотрудник</option>
            <option value={Role.Customer}>Заказчик</option>
            <option value={Role.Manager}>Менеджер</option>
          </select>
        </div>
        <div className={styles.loginBtnBlock}>
          <button
              className={styles.loginBtn}
              onClick={() => registration(userAuth)}
              type={"submit"}
          >
            Зарегистрироваться
          </button>
          <div className={styles.accountBlock}>
            <div className={styles.accountText}>У вас есть аккаунт?</div>
            <button
                className={styles.accountButton}
                onClick={() => navigate("/login")}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Registration);
