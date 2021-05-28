pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract multiNFT is ERC721 {
    //may need to add a time delay between certain function calls for UX, to the length of expected bridge call time
    IERC721 redeemer;
    address manager;

    constructor(address _redeemer, string memory baseURI_)
        public
        ERC721("Composable", "MNFT")
    {
        redeemer = IERC721(_redeemer);
        manager = msg.sender;
        _setBaseURI(baseURI_);
    }

    struct Synchrony {
        uint256 startTime;
        uint256 endTime;
    }

    Synchrony[] public syncs;

    function redeemMNFT() external returns (bool) {
        // require(redeemer.balanceOf(msg.sender) == 1, "cannot redeem");
        syncs.push(Synchrony(block.timestamp, block.timestamp));

        //need some boolean check that disables crossMint
        _safeMint(msg.sender, 1337); //can only mint once.

        crossMint();
        return true;
    }

    function crossMint() internal {
        //call bridge with calldata to mint.
        console.log("crossminted");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721) {
        crossSafeTransferFrom();
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721) {
        crossTransferFrom();
    }

    // function approve(
    //     address from,
    //     address to,
    //     uint256 tokenId) public override(ERC721) {
    //     if (!caller) {
    //         crossApprove();
    //     }
    // }

    ///bridge functions
    function crossSafeTransferFrom() internal {
        console.log("transferred override");
    }

    function crossTransferFrom() internal {
        console.log("transferred override");
    }

    function crossApprove() internal {}
}
