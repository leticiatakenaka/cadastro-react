import * as React from "react";
import * as MU from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons/faArrowDownShortWide";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import { tableCell } from "../../styles";

import { useNavigate } from "react-router-dom";

function ListProducts() {
  const navigate = useNavigate();

  const items = JSON.parse(localStorage.getItem("items"));

  const [showItems, setShowItems] = React.useState(items);
  const [flag, setFlag] = React.useState(false);

  var items2 = [];

  const sortItems = () => {
    if (items) {
      items2 = items;
    }
    if (!flag) {
      items2 = items2.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
      setFlag(true);
    } else {
      items2 = items2.sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
      setFlag(false);
    }
    setShowItems(items2);
  };

  const removeItem = (i) => {
    let itemsArray = JSON.parse(localStorage.getItem("items"));
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    setShowItems(itemsArray);
  };

  const editItem = (i) => {
    navigate(`/${i}`);
  };

  return (
    <>
      <div className="showDiv">
        <MU.TableContainer component={MU.Paper}>
          <MU.Table sx={{ minWidth: 350 }} aria-label="simple table">
            <MU.TableHead>
              <MU.TableRow>
                <MU.TableCell>Nome</MU.TableCell>
                <MU.TableCell>Descrição</MU.TableCell>
                <MU.TableCell>Disponível</MU.TableCell>
                <MU.TableCell width="150px" style={tableCell}>
                  Preço&nbsp;(R$)&nbsp;
                  {!flag ? (
                    <FontAwesomeIcon
                      onClick={sortItems}
                      icon={faArrowDownShortWide}
                      cursor={"pointer"}
                      fontSize={"24px"}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={sortItems}
                      icon={faArrowDownWideShort}
                      cursor={"pointer"}
                      fontSize={"24px"}
                    />
                  )}
                </MU.TableCell>
                <MU.TableCell></MU.TableCell>
                <MU.TableCell></MU.TableCell>
              </MU.TableRow>
            </MU.TableHead>
            {showItems && (
              <MU.TableBody>
                {showItems.map((row, index) => (
                  <MU.TableRow key={index}>
                    <MU.TableCell>{row.name}</MU.TableCell>
                    <MU.TableCell>{row.description}</MU.TableCell>
                    <MU.TableCell>{row.avaliable ? "SIM" : "NÃO"}</MU.TableCell>
                    <MU.TableCell>{row.price.toLocaleString()}</MU.TableCell>
                    <MU.TableCell>
                      <EditIcon
                        cursor="pointer"
                        color="warning"
                        onClick={() => editItem(index)}
                      />
                    </MU.TableCell>
                    <MU.TableCell>
                      <DeleteIcon
                        cursor="pointer"
                        color="error"
                        onClick={() => removeItem(index)}
                      />
                    </MU.TableCell>
                  </MU.TableRow>
                ))}
              </MU.TableBody>
            )}
          </MU.Table>
        </MU.TableContainer>
        {(!showItems || showItems.length === 0) && (
          <h4 style={{ color: "red" }}>Por favor, insira um item!</h4>
        )}
        <MU.Button
          style={{ marginTop: "48px" }}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          CADASTRAR UM PRODUTO
        </MU.Button>
      </div>
    </>
  );
}

export default ListProducts;
