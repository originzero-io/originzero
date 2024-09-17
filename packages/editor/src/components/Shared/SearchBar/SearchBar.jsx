import PropTypes from "prop-types";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBarWrapper = styled.div`
  position: relative;
  color: #a8a8a8;
`;
const Input = styled.input`
  border-radius: 4px;
  width: 100%;
  padding: 6px;
  padding-left: 35px;
  background-color: ${({ theme }) => (theme === "dark" ? "#262626" : "#F4F4F4")};
  border: none;
  color: #757575;
  outline: none;
`;

function SearchBar({ placeholder, onChange, containerStyle, inputStyle, theme = "dark" }) {
  return (
    <SearchBarWrapper style={containerStyle} theme={theme}>
      <Input placeholder={placeholder} onChange={onChange} style={inputStyle} theme={theme} />
      <AiOutlineSearch
        style={{
          position: "absolute",
          top: "18%",
          left: "2%",
          fontSize: "22px",
        }}
      />
    </SearchBarWrapper>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  theme: PropTypes.string,
};

export default SearchBar;
