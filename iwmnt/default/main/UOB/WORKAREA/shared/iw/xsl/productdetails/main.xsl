<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/tiled_display_2.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/apply_now.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/accordion.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/free_text_1_column.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/menu_3_column.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/static_banner.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/promotion_2_col.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/promotion_3_col.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/text_img_1_colum.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/tiled_display_3.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/tiled_display_4.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/image_3_column.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/image_2_column.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/table.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/freeform.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productdetails/free_text_2_column.xsl"/>
	


	<xsl:template name="main">
		<xsl:param name="string"/>
		<xsl:variable name="vAllowedSymbols" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'"/>
		<xsl:if test="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/tab_feature_segment != ''">
		<div id="sticky-navibar" class="container">
			<div class="row sticky-wrapper">
				<div class="sticky-nav col-5">
					<ul class="nav-heading list-unstyled">	
						<xsl:for-each select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/tab_feature_segment">

							<xsl:variable name="lowercase-text">
								<xsl:call-template name="to-lowercase">
									<xsl:with-param name="string" select="title"/>
								</xsl:call-template>
							</xsl:variable>


							<li>
								<xsl:attribute name="class">
									<xsl:if test="position()=1">
										<xsl:text>active</xsl:text>
									</xsl:if>
								</xsl:attribute>
								<a>
									<xsl:attribute name="href">#<xsl:value-of select="translate($lowercase-text,translate($lowercase-text,$vAllowedSymbols, ''),'')"/></xsl:attribute>
									<xsl:attribute name="title">
										<xsl:value-of select="title" />
									</xsl:attribute>
									<xsl:value-of select="title" />
								</a>
							</li>
						</xsl:for-each>
					</ul>
				</div>
			</div>
		</div>

		<xsl:for-each select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/tab_feature_segment">

			<xsl:variable name="lowercase-text">
				<xsl:call-template name="to-lowercase">
					<xsl:with-param name="string" select="title"/>
				</xsl:call-template>
			</xsl:variable>

			<div class="container">
				<div class="row sticky-wrapper">
					<div class="section-title">
						<xsl:attribute name="id">
							<xsl:value-of select="translate($lowercase-text,translate($lowercase-text,$vAllowedSymbols, ''),'')"/>
						</xsl:attribute>

						<xsl:choose>
							<xsl:when test="title != '' and subtitle != ''">
								<h2 class="heading2 subtitle"><xsl:value-of select="title" /></h2>
								<span><xsl:value-of select="subtitle" /></span>
							</xsl:when>
							<xsl:when test="title != '' and subtitle = ''">
								<h2 class="heading2"><xsl:value-of select="title" /></h2>
							</xsl:when>
							<xsl:otherwise>
							</xsl:otherwise>
						</xsl:choose>
					</div>
					<xsl:for-each select="features/*">

						<xsl:choose>
							<xsl:when test="local-name()='tiled_display_2'">
								<xsl:call-template name="tiled_display_2" />
							</xsl:when>
							<xsl:when test="local-name()='apply_now'">
								<xsl:call-template name="apply_now" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='accordion'">
								<xsl:call-template name="accordion" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='free_text_1_column'">
								<xsl:call-template name="free_text_1_column" />
							</xsl:when>
							<xsl:when test="local-name()='menu_3_column'">
								<xsl:call-template name="menu_3_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='static_banner'">
								<xsl:call-template name="static_banner" />
							</xsl:when>
							<xsl:when test="local-name()='promotion_2_col'">
								<xsl:call-template name="promotion_2_col" />
							</xsl:when>
							<xsl:when test="local-name()='promotion_3_col'">
								<xsl:call-template name="promotion_3_col" />
							</xsl:when>
							<xsl:when test="local-name()='text_img_1_colum'">
								<xsl:call-template name="text_img_1_colum" />
							</xsl:when>
							<xsl:when test="local-name()='tiled_display_3'">
								<xsl:call-template name="tiled_display_3" />
							</xsl:when>
							<xsl:when test="local-name()='tiled_display_4'">
								<xsl:call-template name="tiled_display_4" />								
							</xsl:when>
							<xsl:when test="local-name()='img_3_column'">
								<xsl:call-template name="image_3_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='img_2_column'">
								<xsl:call-template name="image_2_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='table'">
								<xsl:call-template name="table" />
							</xsl:when>
							<xsl:when test="local-name()='freeform'">
								<xsl:call-template name="freeform" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='free_text_2_column'">
								<xsl:call-template name="free_text_2_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:otherwise>Failed to find XSL</xsl:otherwise>
						</xsl:choose>
					</xsl:for-each>

				</div>
			</div>
		</xsl:for-each>
		</xsl:if>
		<!-- ********************************************************************************************* -->		
		<!-- For non-tabbed Section handling -->
		<!-- ********************************************************************************************* -->		
		<xsl:for-each select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/non_tab_feature_segment">
			<xsl:variable name="lowercase-text">
				<xsl:call-template name="to-lowercase">
					<xsl:with-param name="string" select="title"/>
				</xsl:call-template>
			</xsl:variable>


			<div class="container">
				<div class="row sticky-wrapper">
				
						<xsl:choose>
							<xsl:when test="title != '' and subtitle != ''">
							<div class="section-title">
								<h2 class="heading2 subtitle"><xsl:value-of select="title" /></h2>
								<span><xsl:value-of select="subtitle" /></span>
							</div>
							</xsl:when>
							<xsl:when test="title != '' and subtitle = ''">
							<div class="section-title">
								<h2 class="heading2"><xsl:value-of select="title" /></h2>
							</div>
							</xsl:when>
							<xsl:otherwise>
							</xsl:otherwise>
						</xsl:choose>
					

					<xsl:for-each select="features/*">

						<xsl:choose>
							<xsl:when test="local-name()='tiled_display_2'">
								<xsl:call-template name="tiled_display_2" />
							</xsl:when>
							<xsl:when test="local-name()='apply_now'">
								<xsl:call-template name="apply_now" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='accordion'">
								<xsl:call-template name="accordion" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='free_text_1_column'">
								<xsl:call-template name="free_text_1_column" />
							</xsl:when>
							<xsl:when test="local-name()='menu_3_column'">
								<xsl:call-template name="menu_3_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='static_banner'">
								<xsl:call-template name="static_banner" />
							</xsl:when>
							<xsl:when test="local-name()='promotion_2_col'">
								<xsl:call-template name="promotion_2_col" />
							</xsl:when>
							<xsl:when test="local-name()='promotion_3_col'">
								<xsl:call-template name="promotion_3_col" />
							</xsl:when>
							<xsl:when test="local-name()='text_img_1_colum'">
								<xsl:call-template name="text_img_1_colum" />
							</xsl:when>
							<xsl:when test="local-name()='tiled_display_3'">
								<xsl:call-template name="tiled_display_3" />
							</xsl:when>
							<xsl:when test="local-name()='tiled_display_4'">
								<xsl:call-template name="tiled_display_4" />								
							</xsl:when>
							<xsl:when test="local-name()='img_3_column'">
								<xsl:call-template name="image_3_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='img_2_column'">
								<xsl:call-template name="image_2_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='table'">
								<xsl:call-template name="table" />
							</xsl:when>
							<xsl:when test="local-name()='freeform'">
								<xsl:call-template name="freeform" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:when test="local-name()='free_text_2_column'">
								<xsl:call-template name="free_text_2_column" />
								<div class="divider"></div>
							</xsl:when>
							<xsl:otherwise>Failed to find XSL</xsl:otherwise>
						</xsl:choose>
					</xsl:for-each>
				</div>
			</div>
		</xsl:for-each>

		<xsl:if test="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/apply_now_sticky/message != ''">
			<div class="container">
				<div class="apply-now-fixed">
					<div class="wrap-content">
						<p>
							<xsl:value-of select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/apply_now_sticky/message"/>
						</p>

						<a class="btn-1">
							<xsl:attribute name="href">
								<xsl:value-of select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/apply_now_sticky/cta_link"/>
							</xsl:attribute>
							<xsl:attribute name="title">
								<xsl:value-of select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/apply_now_sticky/cta_label"/>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>btn-1</xsl:text>
							</xsl:attribute>
							<xsl:value-of select="/Properties/Data/Datum[@ID='maindetails']/DCR[@Type='details']/root/apply_now_sticky/cta_label"/>
						</a>
					</div>
					<span class="arrow-expand open"></span>
				</div>
			</div>
		</xsl:if>

	</xsl:template>
</xsl:stylesheet>