import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import styles from './dashboardBody.module.scss'
import cardOne from '../../assets/images/cards/NEU_Main2.jpg'
import cardTwo from '../../assets/images/cards/NEU_Pampanga.jpg'
import cardThree from '../../assets/images/cards/NEU_Lipa.jpg'
import cardFour from '../../assets/images/cards/4th.jpg'
import chart from '../../assets/images/cards/chart.jpg'

export default class DashboardBody extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dataLine: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Paid",
                        fill: true,
                        lineTension: 0.3,
                        backgroundColor: "rgba(225, 204,230, .3)",
                        borderColor: "rgb(205, 130, 158)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgb(205, 130,1 58)",
                        pointBackgroundColor: "rgb(255, 255, 255)",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgb(0, 0, 0)",
                        pointHoverBorderColor: "rgba(220, 220, 220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 76, 50, 45, 51, 80, 90]
                    },
                    {
                        label: "Unpaid",
                        fill: true,
                        lineTension: 0.3,
                        backgroundColor: "rgba(184, 185, 210, .3)",
                        borderColor: "rgb(35, 26, 136)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgb(35, 26, 136)",
                        pointBackgroundColor: "rgb(255, 255, 255)",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgb(0, 0, 0)",
                        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [28, 25, 35, 40, 45, 80, 85]
                    }
                ]
            }
        }

    }

    render() {
        const { statisticsData } = this.props
        return (
            <div className={styles.DashboardBody}>
                <Row className={`mt-3 px-5`}>
                    <h2>Dashboard</h2>
                </Row>
                <Row className={`mt-2 px-5 user-select-none`} >
                    <Col sm={3} className={`d-flex justify-content-center`}>
                        <div className={`${styles.Card} card`}>
                            <img className={`${styles.Card}`} src={cardOne} alt="paid-card"></img>
                            <h4 className={`${styles.CardLabel} card-header px-0`}>
                                <Row className={`w-100 mx-0`}>
                                    <Col>Paid:</Col>
                                    <Col className={`d-flex justify-content-end`}>{statisticsData.paid}</Col>
                                </Row>
                            </h4>
                        </div>
                    </Col>
                    <Col sm={3} className={`d-flex justify-content-center`}>
                        <div className={`${styles.Card} card`}>
                            <img className={`${styles.Card}`} src={cardTwo} alt="pending-card"></img>
                            <h4 className={`${styles.CardLabel} card-header px-0`}>
                                <Row className={`w-100 mx-0`}>
                                    <Col>Pending:</Col>
                                    <Col className={`d-flex justify-content-end`}>{statisticsData.pending}</Col>
                                </Row>
                            </h4>
                        </div>
                    </Col>
                    <Col sm={3} className={`d-flex justify-content-center`}>
                        <div className={`${styles.Card} card`}>
                            <img className={`${styles.Card}`} src={cardThree} alt="unpaid-card"></img>
                            <h4 className={`${styles.CardLabel} card-header`}>
                                <Row>
                                    <Col>Unpaid:</Col>
                                    <Col className={`d-flex justify-content-end`}>{statisticsData.unpaid}</Col>
                                </Row>
                            </h4>
                        </div>
                    </Col>
                    <Col sm={3} className={`d-flex justify-content-center`}>
                        <div className={`${styles.Card} card`}>
                            <img className={`${styles.Card}`} src={cardFour} alt="total-card"></img>
                            <h4 className={`${styles.CardLabel} card-header`}>
                                <Row>
                                    <Col>Students:</Col>
                                    <Col className={`d-flex justify-content-end`}>{statisticsData.total}</Col>
                                </Row>
                            </h4>
                        </div>
                    </Col>
                </Row>
                <Row className={`mt-5`}>
                    <Col sm={6}>
                        < MDBContainer className={styles.Chart}>
                            <h4 className="mt-5">Student Analytic chart</h4>
                            <Line data={this.state.dataLine} options={{ responsive: true }} />
                        </MDBContainer >
                    </Col>
                    <Col sm={6}>
                        <div className={`${styles.Card} card`}>
                            <img className={`${styles.Card}`} src={chart} alt="unpaid-card"></img>
                            <h5 className={`${styles.CardLabel} card-header`}>
                                <Row>
                                    <Col>Statical Rate of Paid and Unpaid Students</Col>                                 
                                </Row>
                            </h5>
                        </div>
                        <div className={`${styles.Card} card mt-5`}>
                            <img className={`${styles.Card}`} src={chart} alt="unpaid-card"></img>
                            <h4 className={`${styles.CardLabel} card-header`}>
                                <Row>
                                    <Col>Evaluation of All Students</Col>
                                </Row>
                            </h4>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}