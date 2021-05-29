pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract multiNFT is ERC721 {
    //may need to add a time delay between certain function calls for UX, to the length of expected bridge call time
    IERC721 redeemer;
    address manager;
    uint256 public actionTime;

    constructor(address _redeemer, string memory baseURI_)
        public
        ERC721("Composable", "MNFT")
    {
        redeemer = IERC721(_redeemer);
        manager = msg.sender;
        _setBaseURI(baseURI_);
    }

    function redeemMNFT(bool reciever) external returns (bool) {
        // require(redeemer.balanceOf(msg.sender) == 1, "cannot redeem");
        require(actionTime == 0, "already minteded 1/1");
        actionTime = block.timestamp;

        //need some boolean check that disables crossMint
        _safeMint(msg.sender, 1337); //can only mint once.

        if (reciever == false) {
            crossMint(true);
        }
        return true;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721) {
        revert("must pass in data for bridge filtering");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override(ERC721) {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, _data);

        crossSafeTransferFrom();
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721) {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);

        crossTransferFrom();
    }

    ///bridge functions
    function crossMint(bool reciever) internal {
        //call bridge with calldata to mint.
        bytes memory _calldata = abi.encodePacked("redeemNFT(true)");
        console.log("crossminted ", reciever);
    }

    function crossSafeTransferFrom() internal {
        console.log("transferred override");
    }

    function crossTransferFrom() internal {
        console.log("transferred override");
    }
}
