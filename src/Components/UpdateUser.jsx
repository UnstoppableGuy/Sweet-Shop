import React from "react";

export const UpdateUser = () => {

    return (
        <div class="add-form-group">
            <input type="text" className="form-control" placeholder="First name"/>
            <input type="text" className="form-control" placeholder="Last name"/>
            <input type="tel" pattern="[0-9]"
                className="form-control" placeholder="mobile phone"/>
            <button className="btn btn-success">
                <div className="main-btn">
                    Update Account
                </div>
            </button>
        </div>
    )
}