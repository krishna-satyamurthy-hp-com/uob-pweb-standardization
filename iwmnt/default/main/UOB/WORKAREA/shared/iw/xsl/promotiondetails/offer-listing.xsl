<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template name="offerlisting">
    <div class="container">
	 <script type="text/javascript">
        	window.onload = function() {
        		setOfferListingButtons("$PAGE_SCOPE[promoId]");
        	}
     </script>
      <div class="row sticky-wrapper">
        <div class="offer-listing pusher-b-30">
        	<img src="/iwov-resources/images/promotion-detail/icon-offer.png" alt="Offer listing"></img><span>Offer listing</span>
			  <div class="offer-nav">
				<a href="javascript:void(0);" title="Previous offer" class="pre-offer-arrow">
					<img src="/iwov-resources/images/promotion-detail/left-arrow.png" alt="Previous offer"></img>
				</a>
				<a href="javascript:void(0);" title="Next offer" class="next-offer-arrow">
					<img src="/iwov-resources/images/promotion-detail/right-arrow.png" alt="Next offer"></img>
				</a>
		  </div>
        </div>
      </div>
    </div>
</xsl:template>
</xsl:stylesheet>