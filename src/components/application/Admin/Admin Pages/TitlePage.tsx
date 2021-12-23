import React from "react";

export default function TitlePage() {
  return (
    <div className="title_page container">
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectTitle" className="form-label">
            Project Title :
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="ProjectTitle"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectDescription" className="form-label">
            Description :
          </label>
        </div>
        <div className="col">
          <textarea rows={13}
            className="form-control"
            id="ProjectDescription"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="ProjectStatus" className="form-label">
            Project Status :
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="ProjectTitle"
            required
          />
        </div>
      </div>
    </div>
  );
}
