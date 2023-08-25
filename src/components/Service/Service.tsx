import React from "react";
import styles from "./Service.module.scss";
import classNames from "classnames/bind";
import Heading from "../Heading/Heading";
import images from "../../asset/image/img";
const cx = classNames.bind(styles);
const Service = () => {
  return (
    <div className={cx("box-service")}>
      <div className="container">
        <Heading>Dịch vụ</Heading>
        <div className="row ">
          <div className="col-md-4 col-12">
            <div className={cx("custom-service1")}>
              <h3 className={cx("title-service")}>Chăm sóc thú cưng</h3>
              <ul className={cx("content-service")}>
                <li className={cx("item-service")}>
                  Giúp thú cưng sạch sẽ hơn, gọn gàng hơn
                </li>
                <li className={cx("item-service")}>
                  Giúp thú cưng sạch sẽ hơn, gọn gàng hơn
                </li>
                <li className={cx("item-service")}>
                  Giúp thú cưng sạch sẽ hơn, gọn gàng hơn
                </li>
                <li className={cx("item-service")}>
                  Giúp thú cưng sạch sẽ hơn, gọn gàng hơn
                </li>
                <li className={cx("item-service")}>
                  Giúp thú cưng sạch sẽ hơn, gọn gàng hơn
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className={cx("custom-service2")}>
              <img src={images.bannerService} alt="" />
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className={cx("custom-service3")}>
              <h3 className={cx("title-service")}>KIỂM TRA THÚ CƯNG</h3>
              <ul className={cx("content-service")}>
                <li className={cx("item-service")}>
                  Ngăn ngừa và sớm phát hiện các bệnh nguy hiểm
                </li>
                <li className={cx("item-service")}>
                  Kiểm soát được tình trạng mất cân bằng dinh dưỡng
                </li>
                <li className={cx("item-service")}>
                  Phát hiện bệnh từ những dấu hiệu ban đầu và điều trị dứt điểm
                </li>
                <li className={cx("item-service")}>
                  Tiết kiệm chi phí và thời gian điều trị cho thú cưng
                </li>
                <li className={cx("item-service")}>
                  Phòng ngừa các bệnh lây từ thú sang người
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
