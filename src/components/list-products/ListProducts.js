import * as React from "react";
import * as MU from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSortUp } from "@fortawesome/free-solid-svg-icons/faSortUp";
import { faSortDown } from "@fortawesome/free-solid-svg-icons/faSortDown";

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

  return (
    <>
      <div className="showDiv">
        <MU.TableContainer component={MU.Paper}>
          <MU.Table sx={{ minWidth: 350 }} aria-label="simple table">
            <MU.TableHead>
              <MU.TableRow>
                <MU.TableCell>Nome</MU.TableCell>
                <MU.TableCell style={tableCell}>
                  Preço&nbsp;(R$)&nbsp;
                  {!flag && (
                    <MU.Fab size="small" onClick={sortItems}>
                      <FontAwesomeIcon icon={faSortDown} />
                    </MU.Fab>
                  )}
                  {flag && (
                    <MU.Fab size="small" onClick={sortItems}>
                      <FontAwesomeIcon icon={faSortUp} />
                    </MU.Fab>
                  )}
                </MU.TableCell>
              </MU.TableRow>
            </MU.TableHead>
            {showItems && (
              <MU.TableBody>
                {showItems.map((row, index) => (
                  <MU.TableRow key={index}>
                    <MU.TableCell>{row.name}</MU.TableCell>
                    <MU.TableCell align="right">
                      {row.price.toLocaleString()}
                    </MU.TableCell>
                  </MU.TableRow>
                ))}
              </MU.TableBody>
            )}
          </MU.Table>
        </MU.TableContainer>
        {!showItems && (
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
