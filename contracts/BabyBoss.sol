// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BabyBoss is Ownable, ERC721A {
    using Strings for uint256;

    string private _baseURIextended = "";
    string public unrevealURI =
        "ipfs://QmXosHGnJPyDVWzLQ7uTyowmrkPzb3VvretTVGhNVYKtvn/unreveal.json";
    bool public reveal = false;
    bool public pauseMint = true;

    uint256 public constant MAX_NFT_SUPPLY = 3333;

    struct SaleConfig {
        uint256 saleStartTime;
        uint256 publicSalePrice;
        uint8 publicSaleLimit;
    }

    SaleConfig public saleConfig;

    constructor() ERC721A("TEST", "TTT") {
        uint256 _saleStartTime = block.timestamp;
        saleConfig = SaleConfig(_saleStartTime, 0 ether, 30);
    }

    function setConfig(
        uint256 _saleStartTime,
        uint256 _publicSalePrice,
        uint8 _publicSaleLimit
    ) public onlyOwner {
        saleConfig = SaleConfig(
            _saleStartTime,
            _publicSalePrice,
            _publicSaleLimit
        );
    }

    function isSaleStarted() public view returns (bool) {
        return saleConfig.saleStartTime <= block.timestamp;
    }

    function mintNFTForOwner() public onlyOwner {
        require(!pauseMint, "Paused!");
        require(totalSupply() < MAX_NFT_SUPPLY, "Sale has already ended");

        _safeMint(msg.sender, 1);
    }

    /**
     * mint function
     */
    function publicSale(uint256 _quantity) public payable {
        require(isSaleStarted(), "Sale is not started.");
        require(_quantity > 0);
        require(!pauseMint, "Paused!");
        require(
            totalSupply() + _quantity < MAX_NFT_SUPPLY,
            "Sale has already ended"
        );
        require(
            saleConfig.publicSalePrice * _quantity <= msg.value,
            "ETH value is not correct"
        );
        require(
            balanceOf(msg.sender) + _quantity <= saleConfig.publicSaleLimit,
            "Exceeded mint number."
        );

        _safeMint(msg.sender, _quantity);
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        address payable ownerAddress = payable(msg.sender);
        ownerAddress.transfer(balance);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (!reveal) return unrevealURI;
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

    function setUnrevealURI(string memory _uri) external onlyOwner {
        unrevealURI = _uri;
    }

    function Reveal() public onlyOwner {
        reveal = true;
    }

    function UnReveal() public onlyOwner {
        reveal = false;
    }

    function pause() public onlyOwner {
        pauseMint = true;
    }

    function unPause() public onlyOwner {
        pauseMint = false;
    }

    function getOwnershipData(
        uint256 tokenId
    ) external view returns (TokenOwnership memory) {
        return ownershipOf(tokenId);
    }
}
