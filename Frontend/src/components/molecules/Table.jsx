import React from "react";
import "../styles/molecules/Table.css"
function Table (props){
    return (
        <table className="report-table">
          <thead>
            <tr>
              <th>Inversión</th>
              <th>Vendido</th>
              <th>Ganancias Brutas</th>
              <th>% Ganancia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {props.mes1.invertido} </td>
              <td> {props.mes1.vendido} </td>
              <td> {props.mes1.vendido - props.mes1.invertido}</td>
              <td> {(props.mes1.vendido/(props.mes1.vendido - props.mes1.invertido))*100} %</td>
            </tr>
            <tr>
              <td> {props.mes2.invertido} </td>
              <td> {props.mes2.vendido} </td>
              <td> {props.mes2.vendido - props.mes2.invertido}</td>
              <td> {(props.mes2.vendido/(props.mes2.vendido - props.mes2.invertido))*100}  %</td>
            </tr>
            <tr>
                <td> {props.mes3.invertido} </td>
                <td> {props.mes3.vendido} </td>
                <td> {props.mes3.vendido - props.mes3.invertido}</td>
                <td> {(props.mes3.vendido/(props.mes3.vendido - props.mes3.invertido))*100}  %</td>
            </tr>
          </tbody>
        </table>
    )
}
export default Table;