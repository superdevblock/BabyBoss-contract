// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Mecha is Ownable, ERC721 {
    using Strings for uint256;

    string private _baseURIextended = "";
    uint256 public constant MAX_NFT_SUPPLY = 3333;

    address public stakingAddress;

    constructor() ERC721("MeCha", "MCN") {}

    modifier onlyStakingConract() {
        require(msg.sender == stakingAddress);
        _;
    }

    function changeStakingAddress(address _stakingAddress) public onlyOwner {
        stakingAddress = _stakingAddress;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);
        bool allowed = from == address(0) ||
            from == stakingAddress ||
            to == stakingAddress;
        require(allowed, "not allowed");
    }

    function mint(address to, uint256 _tokenId) external onlyStakingConract {
        _safeMint(to, _tokenId);
    }

    function isMinted(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            bytes(_baseURIextended).length > 0
                ? string(
                    abi.encodePacked(
                        _baseURIextended,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }
}
