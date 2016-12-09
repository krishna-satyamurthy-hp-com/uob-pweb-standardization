<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template name="promotionlisting">

<div class="container">
        <div class="row sticky-wrapper">
          <section class="filter-content-block pusher-t-30">
            <ul class="filter-item list-unstyled list-inline hidden-xs">
              <li class="active"><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="All">All</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="0 - 9">0 - 9</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="A - E">A - E</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="F - J">F - J</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="K - O">K - O</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="P - T">P - T</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="U - Z">U - Z</a>
              </li>
              <li>|</li>
              <li><a href="javascript:void(0);" onclick="handleTitleFilterEvent(this)" title="Others">Others</a>
              </li>
            </ul>
            <div class="dropdown-filter-group hidden-sm hidden-md hidden-lg">
              
              <label for="sort-by">Sort by</label>
              <div class="dropdown">
                <button id="sort-by" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-dropdown btn-dropdown-select"><span class="text-bold">All</span><span class="caret"></span></button>
                <div aria-labelledby="sort-by" class="dropdown-menu dropdown-select">
                  <ul class="list-unstyled">
                    <li onclick="handleTitleFilterEvent(this)">All</li>
                    <li onclick="handleTitleFilterEvent(this)">0 - 9</li>
                    <li onclick="handleTitleFilterEvent(this)">A - E</li>
                    <li onclick="handleTitleFilterEvent(this)">F - J</li>
                    <li onclick="handleTitleFilterEvent(this)">K - O</li>
                    <li onclick="handleTitleFilterEvent(this)">P - T</li>
                    <li onclick="handleTitleFilterEvent(this)">U - Z</li>
                    <li onclick="handleTitleFilterEvent(this)">Others</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="container">
        <script type="text/javascript">
        	window.onload = function() {
        		handleTitleFilterEvent("All");
        	}
        </script>
        <div class="row sticky-wrapper">
          <section class="box-content-block pusher-b-30 last-block-mobile">
            <div class="container" id="promotion-list-wrapper" >
			<xsl:attribute name="title">
				<xsl:value-of select="Properties/Data/Datum[@ID='promotionCategoryType']/Option[@Selected='true']/Value"/>
			</xsl:attribute>
              <div class="row">
              	
              </div>
            </div>
          </section>
        </div>
      </div>

	  
</xsl:template>
</xsl:stylesheet>
