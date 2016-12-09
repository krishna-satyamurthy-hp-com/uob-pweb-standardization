<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template name="segment_selector">
	<div class="container">
    <div class="row sticky-wrapper">
      <section class="business-detail-block">
        <div class="outer">
          <div id="business-accordion" class="panel-group business-accor">
          	<xsl:for-each select="Properties/Data/Datum[@ID='segment_selector']/DCR[@Type='selector']/root/Section">
	          	<xsl:variable name="sectionId" select="concat('offerCollapse', position())" /> 
	          	<div class="business-block">
	              <div class="panel panel-default">
		              <div class="panel-heading hidden-sm hidden-md hidden-lg">
	                  <h6 class="panel-title">
	                  	<a data-toggle="collapse" data-parent="accordion" class="accordion-toggle collapse">
	                  		<xsl:attribute name="href">
	                  			<xsl:value-of select="concat('#' , $sectionId)" /> 
	                  		</xsl:attribute>
	                  		<xsl:attribute name="title">
	                  			<xsl:value-of select="SectionTitle" />
	                  		</xsl:attribute>
	                  		<xsl:value-of select="SectionTitle" />
	                  	</a>
	                  </h6>
	                </div>
	                <h3 class="heading3 hidden-xs">
	                	<xsl:value-of select="SectionTitle" />
	                </h3>
	                <div id="{$sectionId}" class="panel-collapse collapse">
	                  <div class="panel-body business-block-items">
	                  	<xsl:for-each select="Segment">
	                  		<div class="business-item">
		                      <h4>
		                      	<a>
		                      		<xsl:attribute name="href">
		                      			<xsl:value-of select="SegmentLink" />
		                      		</xsl:attribute>
		                      		<xsl:value-of select="SegmentTitle" />
		                      	</a>
		                      </h4>
		                      <p>
		                      	<xsl:value-of select="SegmentDesc" disable-output-escaping="yes"/>
		                      </p>
		                    </div>
	                  	</xsl:for-each>
	                  </div>
	                </div>
	              </div>
	            </div>	
          	</xsl:for-each>
          </div>
        </div>
      </section>
    </div>
  </div>
</xsl:template>
</xsl:stylesheet>