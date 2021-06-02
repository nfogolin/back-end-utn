
create sp_LogServiceActivity @activityId varchar(50)
									, @nType int
									, @sUrl varchar(250) = NULL
									, @sAction varchar(250) = NULL
									, @sSoapMessage varchar(MAX) = NULL
									, @ExceptionMessage varchar(MAX) = NULL
									, @userId bigint = NULL
									, @errorCode int = NULL OUTPUT
									, @errorDescription varchar(MAX) = NULL OUTPUT
As
	/*
		1 - Request
		2 - Response
		3 - Exception
	*/

	declare @Type varchar(10)

	if @nType IN (1, 2, 3)
		begin
			if @nType = 1
				set @Type = 'Request'
			else if @nType = 2
				set @Type = 'Response'
			else
				set @Type = 'Exception'

			insert into logServiceActivity(activityID, 
						userID, 
						Url, 
						Action, 
						Type, 
						SoapMessage, 
						ExceptionMessage, 
						loadDate) VALUES 
						(@activityId,
						@userId,
						@sUrl, 
						@sAction,
						@Type, 
						@sSoapMessage,
						@ExceptionMessage,
						GETDATE())
		end
	else
		begin
			set @errorCode = 3000
			set @errorDescription = 'El tipo de registro no es válido: ' + cast(@nType as varchar(MAX))
		end