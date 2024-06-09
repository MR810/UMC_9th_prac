import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="page-container"
        style={{
            backgroundColor: "#22254b",
            height: "800px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <div
                style={{
                    color: "white",
                    fontFamily: "sans-serif",
                    marginTop: "64px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "32px",
                }}
            >
                Oops!
            </div>

            <div
                style={{
                    color: "white",
                    fontFamily: "sans-serif",
                    fontSize: "20px",
                    lineHeight: "1.6",
                }}
            >
                예상치 못한 에러가 발생했습니다; '^`
            </div>
            
            <div
                style={{
                    color: "white",
                    fontFamily: "italic",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontWeight: "200"
                }}
            >
                Not Found
            </div>

            <div
                onClick={() => navigate('/')}
                style={{
                    fontFamily: "sans-serif",
                    fontSize: "32px",
                    lineHeight: "1.6",
                    color: 'white',
                    cursor: 'pointer',
                    marginTop: "32px",
                }}
            >
                메인으로 이동하기
            </div>
        </div>

    );
}
