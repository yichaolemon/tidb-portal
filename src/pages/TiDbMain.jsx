import { useEffect, useState, React } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function PopOverSelector({labelName, options, setSelectedOuter}) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    setSelectedOuter(selected)
    console.log("selected: ", selected)
  }, [selected]);

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };
  const handleCheckbox = event => {
    const value = event.target.value;
    if (selected.includes(value)) {
      setSelected(selected.filter(opt => opt !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <>
      <span
        className="popover-toggle"
        onClick={togglePopover}
      >
        {labelName}
      </span>
      <div className={`popover ${isPopoverVisible ? 'popover-show' : ''}`}>
        <span className="selector-label">{labelName}:</span>
        {options.map((opt, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              value={opt}
              checked={selected.includes(opt)}
              onChange={handleCheckbox}
            />
            <label htmlFor={`checkbox-${index}`}>{opt}</label>
          </div>
        ))}
      </div>
    </>
  )
}

const SearchableClusterTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.host.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegions.length === 0 || selectedRegions.includes(item.region))
  );

  const regions = [...new Set(data.map(item => item.region))];
  const environments = [...new Set(data.map(item => item.environment))];

  return (
    <div>
      <input
          type="text"
          placeholder="Search for host..."
          value={searchTerm}
          onChange={handleChange}
      />
      <PopOverSelector labelName={"Select Regions"} options={regions} setSelectedOuter={setSelectedRegions}/>
      {/* <PopOverSelector labelName={"Select Environments"} options={environments} setSelectedOuter={setSelectedEnvs}/> */}
      <table>
        <thead>
          <tr>
            <th>Host</th>
            <th>Dashboard</th>
            <th>Status</th>
            <th>Environment</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td><Link to={row.host}>{row.host}</Link></td>
              <td><a href={row.dashboardDns}>{row.dashboardDns}</a></td>
              <td>{row.status}</td>
              <td>{row.environment}</td>
              <td>{row.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const TiDbMainPage = () => {
  const data = [
    {host: 'tidb-azure-westus-jobs.dev.databricks.com', dashboardDns: 'tidb-dashboard-azure-westus-jobs.dev.databricks.com', status: 'Available', environment: 'Dev', region: 'dev-azure-westus'},
    {host: 'tidb-azure-westus-devdev.dev.databricks.com', dashboardDns: 'tidb-dashboard-azure-westus-devdev.dev.databricks.com', status: 'Stopped', environment: 'Dev', region: 'dev-azure-westus'},
    {host: 'tidb-azure-koreacentral-jobs.dev.databricks.com', dashboardDns: 'tidb-dashboard-azure-koreacentral-jobs.dev.databricks.com', status: 'Available', environment: 'Dev', region: 'dev-azure-koreacentral'},
    {host: 'tidb-azure-westus-jobs.staging.cloud.databricks.com', dashboardDns: 'tidb-dashboard-azure-westus-jobs.staging.cloud.databricks.com', status: 'Available', environment: 'Staging', region: 'staging-azure-koreacentral'},
  ]
  return (
    <div>
      <p>TiDB Clusters:</p>
      <SearchableClusterTable data={data}/>
    </div>
  )
}