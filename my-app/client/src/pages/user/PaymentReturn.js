import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentReturnPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Thay đổi cách gửi yêu cầu Axios để truyền dữ liệu nếu cần
        const response = await axios.get('/order/vnpay_return', {
          // Thêm các thông tin yêu cầu nếu cần (ví dụ: params, headers)
          // params: {
          //   // Thêm các tham số nếu cần
          // }
        });
  
        const { data } = response;
        console.log('data', data);
  
        if (data.msg) {
          setPaymentStatus(data.msg);
          setRedirect(data.redirect);
        }
      } catch (error) {
        console.error('Lỗi khi xử lý phản hồi thanh toán: ', error);
        // Xử lý lỗi tại đây nếu cần thiết
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="container mt-5" style={{height:'500px'}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">Thanh toán thành công!</h1>
              <p className="card-text">Cảm ơn bạn đã mua hàng! Hãy kiểm tra email của bạn!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturnPage;
